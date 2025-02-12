import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const orderId = 12345;
const baseEndpoint = buildEndpoint('/store/order');
const orderEndpoint = `${baseEndpoint}/${orderId}`;

test.describe('store /store/order/{orderId}', () => {
  test.beforeEach(async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const orderPayload = {
      id: orderId,
      petId: 123456,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'approved',
      complete: true
    };
    const createResponse = await apiClient.post(baseEndpoint, { data: orderPayload });
    expect(createResponse.status()).toBe(200);
  });

  test('GET: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.get(orderEndpoint);
    expect(response.status()).toBe(200);
  });

  test('DELETE: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.delete(orderEndpoint);
    expect(response.status()).toBe(200);
  });
});
