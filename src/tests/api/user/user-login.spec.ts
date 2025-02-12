import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/user/login');

test.describe('user /user/login', () => {
  test('GET: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.get(endPoint, {
      params: { username: 'newuser', password: 'password' }
    });
    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse.code).toBe(200);
    expect(jsonResponse.type).toBe('unknown');
    expect(jsonResponse.message).toMatch(/^logged in user session:\d+$/);

    const messageParts = jsonResponse.message.split(':');
    expect(messageParts.length).toBe(2);
    const sessionId = Number(messageParts[1]);
    expect(sessionId).toBeGreaterThan(0);
  });
});
