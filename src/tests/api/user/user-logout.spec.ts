import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/user/logout');

test.describe('user /user/logout', () => {
  test('GET: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.get(endPoint);
    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse.code).toBe(200);
    expect(jsonResponse.type).toBe('unknown');
    expect(jsonResponse.message).toBe('ok');

    expect(typeof jsonResponse.code).toBe('number');
    expect(typeof jsonResponse.type).toBe('string');
    expect(typeof jsonResponse.message).toBe('string');

    const expectedKeys = ['code', 'type', 'message'];
    expect(Object.keys(jsonResponse).sort()).toEqual(expectedKeys.sort());
  });
});
