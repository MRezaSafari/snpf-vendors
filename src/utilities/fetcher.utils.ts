import { FetchMethod } from "../models";

export default async function fetcher<T>(method: FetchMethod, url: string) {
  try {
    const response = await fetch(url, {
      method: method,
    });

    // handle different responses. we assume here that we get response every time

    return (await response.json()) as T;
  } catch (error) {
    // log to sentry or some place
    console.log(error);
  }
}
