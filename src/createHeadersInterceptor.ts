import type { Interceptor } from "@connectrpc/connect";

export function createHeadersInterceptor(headers?: Headers): Interceptor {
  return (next) => async (req) => {
    for (const header in headers?.entries()) {
      const [key, value] = header;
      req.header.set(key, value);
    }
    return next(req);
  };
}

export function createAuthInterceptor(token: string): Interceptor {
  return (next) => async (req) => {
    if (!req.header.has("Authorization")) {
      req.header.set("Authorization", `Bearer ${token}`);
    }

    return next(req);
  };
}
