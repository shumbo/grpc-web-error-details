.PHONY: go
go:
		protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/sample.proto
.PHONY: js
js:
		protoc \
		--proto_path="./proto" \
		--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:./client-js/lib \
		--js_out=import_style=commonjs,binary:./client-js/lib \
		./proto/sample.proto
.PHONY: clean
clean:
		rm ./proto/*.go
