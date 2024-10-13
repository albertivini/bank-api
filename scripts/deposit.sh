#!/bin/bash

URL_BASE="http://localhost:3000/accounts"
URL_DEPOSIT="$URL_BASE/deposit"

deposit() {
  local account=$1
  local value=$2
  echo "Deposit: Account $account, Value $value"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"account\": $account, \"value\": $value}" "$URL_DEPOSIT"
}

deposit 1 100