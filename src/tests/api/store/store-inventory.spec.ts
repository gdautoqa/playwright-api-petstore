import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/store/inventory');

test.describe('store /store/inventory', () => {
  test('GET: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.get(endPoint);
    expect(response.status()).toBe(200);

    const inventory = await response.json();
    expect(typeof inventory).toBe('object');
    const keys = Object.keys(inventory);
    expect(keys.length).toBeGreaterThan(0);

    keys.forEach((key) => {
      expect(typeof inventory[key]).toBe('number');
      expect(inventory[key]).toBeGreaterThanOrEqual(0);
    });

    expect(inventory).toHaveProperty('sold');
    expect(inventory).toHaveProperty('available');
    expect(inventory).toHaveProperty('pending');
  });
});
