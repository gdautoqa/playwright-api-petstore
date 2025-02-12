import { apiConfig } from './apiConfig';

export function buildEndpoint(path: string): string {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return `${apiConfig.baseUrl}${apiConfig.pathName}${path}`;
}