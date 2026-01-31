/**
 * Base API client for DreamedTrip. Uses relative /api when no env is set.
 */

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = getBaseUrl();
  const url = path.startsWith("http") ? path : `${base}/api${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as { message?: string }).message ?? "API error");
  }
  return res.json() as Promise<T>;
}
