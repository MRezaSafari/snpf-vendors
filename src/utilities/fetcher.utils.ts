import { FetchMethod } from "../models";

export default async function fetcher<T>(method: FetchMethod, url: string) {
  try {
    const response = await fetch(url, {
      method: method,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    // log to sentry or some place
    console.log(error);
    throw error; // Re-throw the error so the saga can handle it
  }
}
