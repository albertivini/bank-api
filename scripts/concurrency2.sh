#!/bin/bash

# URLs da API
URL_BASE="http://localhost:3000/accounts"
URL_DEPOSIT="$URL_BASE/deposit"
URL_TRANSFER="$URL_BASE/transfer"

deposit() {
  local account=$1
  local value=$2
  echo "Deposit: Account $account, Value $value"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"account\": $account, \"value\": $value}" "$URL_DEPOSIT"
}


transfer() {
  local from_account=$1
  local to_account=$2
  local value=$3
  echo "Transfer: From $from_account To $to_account, Value $value"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"from\": $from_account, \"to\": $to_account, \"value\": $value}" "$URL_TRANSFER"
}

{
  deposit 1 100 &
  transfer 1 2 50 &
  wait
}