# upline-api-server

## Setup After Pulling

create a new `.env` in the root folder and copy the content from `.env.example` to it.

## Development

#### Start the service container

`npm run docker-up:dev`

#### Start the service normally (need postgres installed)

`npm run dev`

## Test Production Build

#### Start the service container

`npm run docker-up:prod`

#### Start the service normally (need postgres installed)

`npm run build`

`npm run start`

## Create New Env

1. add new env in `.env` and `.env.example`
2. add new env in `CICD.yml`
3. add new env in `config.ts`
