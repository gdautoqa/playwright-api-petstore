import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/store/order');

test.describe('store /store/order', () => {
  test('POST: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const orderPayload = {
      id: 54321,
      petId: 123456,
      quantity: 2,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    };
    const response = await apiClient.post(endPoint, { data: orderPayload });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toEqual(
      expect.objectContaining({
        id: orderPayload.id,
        petId: orderPayload.petId,
        quantity: orderPayload.quantity,
        status: orderPayload.status,
        complete: orderPayload.complete
      })
    );

    expect(responseBody.shipDate).toBeTruthy();
    expect(new Date(responseBody.shipDate).toString()).not.toBe('Invalid Date');
  });
});
