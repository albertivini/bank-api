# API-Bank

## Description

Simple Bank API made in Node.Js, Express, Prisma and Postgres.

#### Documentation: ${BASE_URL}/api-docs

## Installation

```bash
$ yarn
```

## Database

```bash
# To Create a new Migration
$ yarn migrate:dev ${migration name}

# To Run Migrations
$ yarn migrate:deploy

# Generate Models
$ yarn prisma:generate
```

## Running the app

```bash
# Docker:
 
$ docker compose up -d 


# Local:

# Build
$ yarn tsc

# Run Dev
$ yarn start

# Run Dist
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
```

## Concurrency

To test concurrency, run the scripts in this order:

```bash
$ scripts/createAccounts.sh 
$ scripts/deposit.sh 
$ scripts/withdraw.sh 
$ scripts/transfer.sh 
$ scripts/concurrency1.sh 
$ scripts/concurrency2.sh 
$ scripts/concurrency3.sh 

```

####  Feito por <b>Vinicius Alberti</b> 