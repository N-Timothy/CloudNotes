#!/usr/bin/env bash

DS="src/db.ts"

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <command>"
    exit 1
fi



if [[ "$1" == "create" ]]; then
    shift
    if [ "$#" -lt 1 ]; then
        echo "Usage: $0 $1 <migration-name>"
        exit 1
    fi
    node -r esbuild-register ./node_modules/typeorm/cli.js migration:create migrations/$1
elif [[ "$1" == "run" ]]; then
    node -r esbuild-register ./node_modules/typeorm/cli.js migration:run -d $DS
elif [[ "$1" == "revert" ]]; then
    node -r esbuild-register ./node_modules/typeorm/cli.js migration:revert -d $DS
elif [[ "$1" == "reset" ]]; then
    node -r esbuild-register ./node_modules/typeorm/cli.js schema:drop -d $DS
fi