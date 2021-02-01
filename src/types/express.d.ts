import { ClaimVerifyResult } from '../middlewares/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: ClaimVerifyResult,
    }
  }
}
