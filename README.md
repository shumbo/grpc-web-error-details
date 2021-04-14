# grpc-web-error-details

Utility function for deserializing the `grpc-web-details-bin` metadata value when using [grpc-web](https://github.com/grpc/grpc-web).

## Motivation

[gRPC provides two models of error handling: standard error model and richer error model](https://grpc.io/docs/guides/error/).

Standard error model, which consists of an error status code and optional string error message, is the "official" gRPC error model.

If you're using protocol buffers, you can also use the richer error model developed and used by Google ([click here for more about the error model](https://cloud.google.com/apis/design/errors#error_model)). This model allows servers to return and clients to consume additional error details as one or more protobuf messages. It also defines a standard set of error message types to cover the most common error cases.

[grpc-web](https://github.com/grpc/grpc-web), the official JavaScript implementation of [gRPC](https://grpc.io/) for browser clients, only supports the standard error model. The error details are encoded in `grpc-web-details-bin` metadata field. However, deserializing the data is not trivial.

This library provides an utility function that takes an error and returns the deserialized Status message and the array of deserialized error details (comparable to Go's `status.FromError` and similar functions in other languages whose gRPC client supports the richer error model).

If you're looking to use the richer error model on Node.js, check out [`@stackpath/node-grpc-error-details`](https://github.com/stackpath/node-grpc-error-details).

## Installation

```bash
yarn add grpc-web-error-details
# or if you're using npm
npm install grpc-web-error-details --save
```

This library also needs `grpc-web` and `google-protobuf`, which are required by gRPC Web clients.

## Usage

Use `statusFromError` to deserialize error to Status and an array of error details. It returns a pair of status and an array of error details.

```ts
function statusFromError(err: any): [Status, ErrorDetails[]] | [null, null];
```

The function returns null if the passed error is not deserializable.

Call the function with an error object and if the return values are not null, call methods and use type assertions to handle errors.

```ts
import * as errorDetails from "./grpc-web-error-details";

// promise client
try {
  grpcWebPromiseClient.call();
} catch (e) {
  const [status, details] = errorDetails.statusFromError(e);
  if (status && details) {
    for (const d of details) {
      // use `instanceof` for type guard
      if (d instanceof errorDetails.BadRequest) {
        // use appropriate methods on details for further information
        for (const v of d.getFieldViolationsList()) {
          console.log(
            `Violation at field ${v.getField()}: ${v.getDescription}`
          );
        }
      }
    }
  }
}

// callback client
grpcWebClient.call(req, {}, (err, response) => {
  if (!err) {
    // RPC Success
    return;
  }
  const [status, details] = errorDetails.statusFromError(err);
  // handle richer error with status and details
});
```

Take a look at `sample/client-js/index.ts` for more examples. You can start the sample gRPC server and Envoy proxy by running `docker-compose up` inside `./sample`, and use `yarn ts-node sample/client-js/index.ts` to run the client sample.
