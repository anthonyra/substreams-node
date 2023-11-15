import { createAuthInterceptor, createHeadersInterceptor } from "./createInterceptors.js";
import type { IMessageTypeRegistry } from "@bufbuild/protobuf";
import { Transport } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

export function createDefaultTransport(
  baseUrl: string,
  registry: IMessageTypeRegistry,
  headers?: Headers,
  token?: string,
): Transport {
  return createConnectTransport({
    baseUrl,
    httpVersion: "2",
    interceptors: [createHeadersInterceptor(headers), createAuthInterceptor(token)],
    jsonOptions: {
      typeRegistry: registry,
    },
  });
}
