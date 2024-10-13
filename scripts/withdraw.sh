#!/bin/bash

URL_BASE="http://localhost:3000/accounts"
URL_WITHDRAW="$URL_BASE/withdraw"

withdraw() {
  local account=$1
  local value=$2
  echo "Withdraw: Account $account, Value $value"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"account\": $account, \"value\": $value}" "$URL_WITHDRAW"
}

withdraw 1 50
