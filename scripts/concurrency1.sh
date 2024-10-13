#!/bin/bash

# URLs da API
URL_BASE="http://localhost:3000/accounts"
URL_DEPOSIT="$URL_BASE/deposit"
URL_WITHDRAW="$URL_BASE/withdraw"

deposit() {
  local account=$1
  local value=$2
  echo "Deposit: Account $account, Value $value"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"account\": $account, \"value\": $value}" "$URL_DEPOSIT"
}

withdraw() {
  local account=$1
  local value=$2
  echo "Withdraw: Account $account, Value $value"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"account\": $account, \"value\": $value}" "$URL_WITHDRAW"
}

{
  deposit 1 50 &
  withdraw 1 30 &
  wait
}