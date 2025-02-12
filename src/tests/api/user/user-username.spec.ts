import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const username = 'example';
const userEndpoint = buildEndpoint(`/user/${username}`);

test.describe('user /user/{username}', () => {
  test.beforeEach(async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const userPayload = {
      id: 0,
      username: username,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
      phone: '123456789',
      userStatus: 1
    };

    const createResponse = await apiClient.post(buildEndpoint('/user'), { data: userPayload });
    expect(createResponse.status()).toBe(200);
  });

  test('GET: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.get(userEndpoint);
    expect(response.status()).toBe(200);
  });

  test('PUT: Should return success', async ({ api }) => {
    const updatedUserData = {
      id: 0,
      username: username,
      firstName: 'UpdatedFirst',
      lastName: 'UpdatedLast',
      email: 'updated@example.com',
      password: 'newpassword',
      phone: '987654321',
      userStatus: 1
    };
    const response = await api.put(userEndpoint, { data: updatedUserData });
    expect(response.status()).toBe(200);
  });

  test('DELETE: Should return success', async ({ api }) => {
    const response = await api.delete(userEndpoint);
    expect(response.status()).toBe(200);
  });
});
