import { createHeadersInterceptor, createAuthInterceptor } from "./createInterceptors.js";
import { Transport } from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";
import type { IMessageTypeRegistry } from "@bufbuild/protobuf";

export function createDefaultTransport(
  baseUrl: string,
  registry: IMessageTypeRegistry,
  headers?: Headers,
  token?: string
): Transport {
  return createGrpcTransport({
    baseUrl,
    httpVersion: "2",
    interceptors: [createHeadersInterceptor(headers), createAuthInterceptor(token)],
    jsonOptions: {
      typeRegistry: registry,
    },
  });
}
