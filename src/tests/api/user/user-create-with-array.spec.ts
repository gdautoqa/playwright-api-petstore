import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/user/createWithArray');

test.describe('user /user/createWithArray', () => {
  test('POST: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const userArrayPayload = [
      {
        id: 0,
        username: 'arrayuser1',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        password: 'password',
        phone: '123456789',
        userStatus: 1
      },
      {
        id: 0,
        username: 'arrayuser2',
        firstName: 'Bob',
        lastName: 'Jones',
        email: 'bob@example.com',
        password: 'password',
        phone: '987654321',
        userStatus: 1
      }
    ];
    const response = await apiClient.post(endPoint, { data: userArrayPayload });
    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse.code).toBe(200);
    expect(jsonResponse.type).toBe('unknown');
    expect(jsonResponse.message).toBe('ok');
  });
});
