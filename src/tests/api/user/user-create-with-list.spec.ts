import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/user/createWithList');

test.describe('user /user/createWithList', () => {
  test('POST: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const userListPayload = [
      {
        id: 0,
        username: 'listuser1',
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie@example.com',
        password: 'password',
        phone: '5555555555',
        userStatus: 1
      },
      {
        id: 0,
        username: 'listuser2',
        firstName: 'Dana',
        lastName: 'White',
        email: 'dana@example.com',
        password: 'password',
        phone: '4444444444',
        userStatus: 1
      }
    ];
    const response = await apiClient.post(endPoint, { data: userListPayload });
    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse.code).toBe(200);
    expect(jsonResponse.type).toBe('unknown');
    expect(jsonResponse.message).toBe('ok');

    const expectedKeys = ['code', 'type', 'message'];
    expect(Object.keys(jsonResponse).sort()).toEqual(expectedKeys.sort());

    expect(typeof jsonResponse.code).toBe('number');
    expect(typeof jsonResponse.type).toBe('string');
    expect(typeof jsonResponse.message).toBe('string');
  });
});