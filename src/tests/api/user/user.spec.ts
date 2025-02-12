import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/user');

test.describe('user /user', () => {
  test('POST: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const userData = {
      id: 0,
      username: 'newuser',
      firstName: 'First',
      lastName: 'Last',
      email: 'newuser@example.com',
      password: 'password',
      phone: '123456789',
      userStatus: 1
    };

    const response = await apiClient.post(endPoint, { data: userData });
    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse.code).toBe(200);
    expect(jsonResponse.type).toBe('unknown');

    expect(typeof jsonResponse.message).toBe('string');
    const userId = Number(jsonResponse.message);
    expect(isNaN(userId)).toBe(false);
    expect(userId).toBeGreaterThan(0);

    const expectedKeys = ['code', 'type', 'message'];
    expect(Object.keys(jsonResponse).sort()).toEqual(expectedKeys.sort());
  });
});
