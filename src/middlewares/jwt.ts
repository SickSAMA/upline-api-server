import { promisify } from 'util';
import fetch from 'node-fetch';
import jsonwebtoken from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { RequestHandler } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import { COGNITO_POOL_ID, COGNITO_POOL_REGION } from '../configs/env';

/**
 * Decode the Amazon Cognito ID token to retrieve the user info. Reference:
 * https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
 */

type PublicKey = jwkToPem.JWK & {
  alg: string;
  kid: string;
  use: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

/* disable eslint for camelcase and any warning */
/* eslint-disable */
interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  ['cognito:username']: string;
}

export interface User {
  readonly username: string;
}

/* extend global Express types */
declare global {
  namespace Express {
    interface Request {
      user?: User,
    }
  }
}

/* eslint-enable */

interface TokenHeader {
  kid: string;
  alg: string;
}

const cognitoIssuer = `https://cognito-idp.${COGNITO_POOL_REGION}.amazonaws.com/${COGNITO_POOL_ID}`;

let cacheKeys: MapOfKidToPublicKey | undefined;
const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const response = await fetch(url);
    const publicKeys: PublicKeys = await response.json();
    cacheKeys = publicKeys.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = { instance: current, pem };
      return agg;
    }, {} as MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const verifyPromised = promisify<string, jsonwebtoken.Secret>(jsonwebtoken.verify.bind(jsonwebtoken));

export const AUTH_KEY = 'authorization';

const middleware = (): RequestHandler => {
  const handler: RequestHandler = async (req, _, next) => {
    // skip if it's a preflight request containing AUTH_KEY
    if (req.method === 'OPTIONS' &&
        Object.prototype.hasOwnProperty.call(req.headers, 'access-control-request-headers') &&
        typeof req.headers['access-control-request-headers'] === 'string') {
      const hasAuthInAccessControl = !!~req.headers['access-control-request-headers']
          .split(',').map(function(header) {
            return header.trim();
          }).indexOf(AUTH_KEY);

      if (hasAuthInAccessControl) {
        return next();
      }
    }

    const authValue = req.headers?.[AUTH_KEY];
    if (typeof authValue === 'undefined') {
      return next();
    }

    let result: User;
    try {
      const token = authValue.replace(/^Bearer /, '');
      const tokenSections = (token || '').split('.');
      if (tokenSections.length < 2) {
        throw new UnauthorizedError('requested token is invalid');
      }
      const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
      const header: TokenHeader = JSON.parse(headerJSON);
      const keys = await getPublicKeys();
      const key = keys[header.kid];
      if (key === undefined) {
        throw new UnauthorizedError('claim made for unknown kid');
      }

      const claim = await verifyPromised(token as string, key.pem) as unknown as Claim;

      const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
      if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        throw new UnauthorizedError('claim is expired or invalid');
      }
      if (claim.iss !== cognitoIssuer) {
        throw new UnauthorizedError('claim issuer is invalid');
      }
      if (claim.token_use !== 'id') {
        throw new UnauthorizedError('claim use is not access');
      }

      console.log(`claim confirmed for ${claim['cognito:username']}`);

      result = { username: claim['cognito:username'] };
      req.user = result;
      next();
    } catch (error) {
      next(error);
    }
  };

  return handler;
};

export default middleware;
