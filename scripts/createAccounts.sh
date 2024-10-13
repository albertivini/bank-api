#!/bin/bash

URL="http://localhost:3000/accounts"

create_account() {
  local account=$1
  echo "Create account $account"
  curl -s -X POST -H "Content-Type: application/json" -d "{\"username\": \"$account\"}" "$URL"
}

create_account "123"
create_account "456"
create_account "789"