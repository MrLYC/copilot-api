#!/bin/sh
if [ "$1" = "--auth" ]; then
  # Run auth command
  exec bun run dist/main.js auth
else
  # Build command with optional arguments
  CMD="bun run dist/main.js start"
  
  if [ -n "$GH_TOKEN" ]; then
    CMD="$CMD -g $GH_TOKEN"
  fi
  
  if [ -n "$API_KEY" ]; then
    CMD="$CMD --api-key $API_KEY"
  fi
  
  # Execute with any additional arguments
  exec $CMD "$@"
fi

