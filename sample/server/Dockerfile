FROM golang:1.16.3 as builder

WORKDIR /go/src

COPY ./../../ ./
RUN go mod download

WORKDIR /go/src/sample/server

ARG CGO_ENABLED=0
ARG GOOS=linux
RUN go build \
  -o /go/bin/main \
  -ldflags '-s -w'

FROM alpine as runner

COPY --from=builder /go/bin/main /app/main

ENTRYPOINT ["/app/main"]
