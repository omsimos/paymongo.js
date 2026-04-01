import config from "../config.js";

const BASE_URL = config.BASE_URL;

export interface FetchClientOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: unknown;
  query?: Record<string, unknown>;
}

export function createFetchClient(secretKey: string) {
  const auth = btoa(`${secretKey}:`);

  return async <T>(options: FetchClientOptions): Promise<T> => {
    const { method, path, body, query } = options;

    let url = `${BASE_URL}${path}`;
    if (query && Object.keys(query).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    const res = await fetch(url, {
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
