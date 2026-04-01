import config from "../config.js";

const BASE_URL = config.BASE_URL;

export interface FetchClientOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: unknown;
}

export function createFetchClient(secretKey: string) {
  const auth = btoa(`${secretKey}:`);

  return async <T>(options: FetchClientOptions): Promise<T> => {
    const { method, path, body } = options;

    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data as T;
  };
}

export type FetchClient = ReturnType<typeof createFetchClient>;
