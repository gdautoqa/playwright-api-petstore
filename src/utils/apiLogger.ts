import { APIResponse } from 'playwright/test';

export function logRequest(url: string, method: string, payload?: any): void {
  console.log(`Sending ${method.toUpperCase()} request to ${url}`);
  if (payload) {
    console.log('Payload:', JSON.stringify(payload, null, 2));
  }
}

export async function logResponse(url: string, response: APIResponse) {
  try {
    const data = await response.json();
    console.log(`Response from ${url}:`, data);
  } catch (error) {
    console.log(`Response from ${url} is not JSON or failed to parse.`);
  }
}
