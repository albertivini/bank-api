#!/bin/bash

URL_BASE="http://localhost:3000/accounts"
URL_TRANSFER="$URL_BASE/transfer"

transfer() {
  local from_account=$1
  local to_account=$2
  local value=$3
  echo "Transfer: From $from_account To $to_account, Value $value"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"from\": $from_account, \"to\": $to_account, \"value\": $value}" "$URL_TRANSFER"
}

transfer 1 2 30
