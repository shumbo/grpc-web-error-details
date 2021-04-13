#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

protoc \
		--proto_path="$DIR/lib" \
		--proto_path="$DIR/proto" \
		--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$DIR/lib \
		--js_out=import_style=commonjs,binary:$DIR/lib \
    $DIR/proto/*.proto
