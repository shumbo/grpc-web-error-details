import * as grpcWeb from 'grpc-web';

import * as sample_pb from './sample_pb';


export class SampleServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sayHello(
    request: sample_pb.HelloRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: sample_pb.HelloReply) => void
  ): grpcWeb.ClientReadableStream<sample_pb.HelloReply>;

  sayError(
    request: sample_pb.ErrorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: sample_pb.HelloReply) => void
  ): grpcWeb.ClientReadableStream<sample_pb.HelloReply>;

}

export class SampleServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sayHello(
    request: sample_pb.HelloRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<sample_pb.HelloReply>;

  sayError(
    request: sample_pb.ErrorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<sample_pb.HelloReply>;

}

