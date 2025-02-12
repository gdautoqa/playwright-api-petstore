import { APIRequestContext, APIResponse } from '@playwright/test';
import { logRequest, logResponse } from '../../utils/apiLogger';

export class BaseApiPage implements APIRequestContext {
  public dispose: APIRequestContext['dispose'];
  public fetch: APIRequestContext['fetch'];
  public head: APIRequestContext['head'];
  public patch: APIRequestContext['patch'];
  public storageState: APIRequestContext['storageState'];
  public [Symbol.asyncDispose]!: APIRequestContext[typeof Symbol.asyncDispose];

  constructor(public request: APIRequestContext) {
    this.dispose = request.dispose.bind(request);
    this.fetch = request.fetch.bind(request);
    this.head = request.head.bind(request);
    this.patch = request.patch.bind(request);
    this.storageState = request.storageState;
    this[Symbol.asyncDispose] = request[Symbol.asyncDispose].bind(request);
  }

  async get(endpoint: string, options?: any): Promise<APIResponse> {
    logRequest(endpoint, 'GET', options?.params);
    const response = await this.request.get(endpoint, options);
    await logResponse(endpoint, response);
    return response;
  }

  async post(endpoint: string, options?: any): Promise<APIResponse> {
    logRequest(endpoint, 'POST', options?.data);
    const response = await this.request.post(endpoint, options);
    await logResponse(endpoint, response);
    return response;
  }

  async put(endpoint: string, options?: any): Promise<APIResponse> {
    logRequest(endpoint, 'PUT', options?.data);
    const response = await this.request.put(endpoint, options);
    await logResponse(endpoint, response);
    return response;
  }

  async delete(endpoint: string, options?: any): Promise<APIResponse> {
    logRequest(endpoint, 'DELETE', options?.data);
    const response = await this.request.delete(endpoint, options);
    await logResponse(endpoint, response);
    return response;
  }
}
