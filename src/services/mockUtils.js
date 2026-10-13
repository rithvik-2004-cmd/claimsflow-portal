export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulates network latency and returns a copy, so callers can't mutate the mock store.
export async function withLatency(factory, ms = 300 + Math.random() * 400) {
  await delay(ms);
  return structuredClone(factory());
}

export const notFound = (message) => ({ status: 404, message, fieldErrors: null });