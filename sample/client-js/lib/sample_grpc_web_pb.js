/**
 * @fileoverview gRPC-Web generated client stub for sample
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.sample = require('./sample_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sample.SampleServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sample.SampleServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sample.HelloRequest,
 *   !proto.sample.HelloReply>}
 */
const methodDescriptor_SampleService_SayHello = new grpc.web.MethodDescriptor(
  '/sample.SampleService/SayHello',
  grpc.web.MethodType.UNARY,
  proto.sample.HelloRequest,
  proto.sample.HelloReply,
  /**
   * @param {!proto.sample.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sample.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sample.HelloRequest,
 *   !proto.sample.HelloReply>}
 */
const methodInfo_SampleService_SayHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sample.HelloReply,
  /**
   * @param {!proto.sample.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sample.HelloReply.deserializeBinary
);


/**
 * @param {!proto.sample.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sample.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sample.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sample.SampleServiceClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sample.SampleService/SayHello',
      request,
      metadata || {},
      methodDescriptor_SampleService_SayHello,
      callback);
};


/**
 * @param {!proto.sample.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sample.HelloReply>}
 *     Promise that resolves to the response
 */
proto.sample.SampleServicePromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sample.SampleService/SayHello',
      request,
      metadata || {},
      methodDescriptor_SampleService_SayHello);
};


module.exports = proto.sample;

