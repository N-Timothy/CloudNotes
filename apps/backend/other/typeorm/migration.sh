#!/usr/bin/env bash

CMD="node -r @swc-node/register ./other/typeorm/cli.js"
DS="$(pwd)/src/db.ts"


if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <command>"
    exit 1
fi

create() {
    shift
    if [ "$#" -lt 1 ]; then
        echo "Usage: $0 $1 <migration-name>"
        exit 1
    fi
    
    local migration_name=$1
    shift
    $CMD migration:create migrations/$migration_name $@
}

run() {
    shift
    $CMD migration:run -d $DS $@
}

revert() {
    shift
    $CMD migration:revert -d $DS $@
}

reset() {
    shift
    $CMD schema:drop -d $DS $@
}

if [[ "$1" == "create" ]]; then
    create $@
elif [[ "$1" == "run" ]]; then
    run $@
elif [[ "$1" == "revert" ]]; then
    revert $@
elif [[ "$1" == "reset" ]]; then
    reset $@
elif [[ "$1" == "fresh" ]]; then
    reset $@ && run $@
fi