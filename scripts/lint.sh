#!/bin/bash

forCheck="--for-check"
isForCheck="$([[ $1 == $forCheck ]] && echo 0 || echo 1)"

echo "Started"

if [ "$isForCheck" -eq 0 ]; then
  pnpm --silent format:check
  echo "Prettier Checked"

  pnpm --silent lint
  echo "ESLint Checked"

  pnpm --silent typecheck
  echo "TypeScript Checked"
else
  pnpm --silent format:fix
  echo "Prettier Completed"

  pnpm --silent lint:fix
  echo "ESLint Completed"

  pnpm --silent typecheck
  echo "TypeScript Completed"
fi

echo "Done"
