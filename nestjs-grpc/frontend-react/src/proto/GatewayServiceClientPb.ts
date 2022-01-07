/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for gateway
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_gateway_pb from '../proto/gateway_pb';


export class GatewayServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoAdd = new grpcWeb.MethodDescriptor(
    '/gateway.GatewayService/Add',
    grpcWeb.MethodType.UNARY,
    proto_gateway_pb.AddRequest,
    proto_gateway_pb.AddResponse,
    (request: proto_gateway_pb.AddRequest) => {
      return request.serializeBinary();
    },
    proto_gateway_pb.AddResponse.deserializeBinary
  );

  add(
    request: proto_gateway_pb.AddRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_gateway_pb.AddResponse>;

  add(
    request: proto_gateway_pb.AddRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_gateway_pb.AddResponse) => void): grpcWeb.ClientReadableStream<proto_gateway_pb.AddResponse>;

  add(
    request: proto_gateway_pb.AddRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_gateway_pb.AddResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/gateway.GatewayService/Add',
        request,
        metadata || {},
        this.methodInfoAdd,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/gateway.GatewayService/Add',
    request,
    metadata || {},
    this.methodInfoAdd);
  }

}

