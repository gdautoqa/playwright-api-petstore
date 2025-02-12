import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const petId = 123456;
const petEndpoint = buildEndpoint(`/pet/${petId}`);

test.describe.serial('pet /pet/{petId}', () => {
  test.beforeEach(async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const petData = {
      id: petId,
      category: { id: 1, name: 'Dogs' },
      name: 'TestPet',
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [{ id: 1, name: 'tag1' }],
      status: 'available'
    };
    const createResponse = await apiClient.post(buildEndpoint('/pet'), { data: petData });
    expect(createResponse.status()).toBe(200);
  });

  test('GET: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);

    const petData = await expect.poll(async () => {
      const response = await apiClient.get(petEndpoint);
      if (response.status() !== 200) return null;
      return await response.json();
    }, { timeout: 15000, intervals: [500] }).toMatchObject(expect.objectContaining({
      id: petId,
      name: 'TestPet',
      photoUrls: expect.any(Array)
    }));

    console.log('Final petData:', petData);
  });

  test('DELETE: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.delete(petEndpoint);
    expect(response.status()).toBe(200);

    const getResponse = await apiClient.get(petEndpoint);
    expect(getResponse.status()).toBe(404);
    const errorData = await getResponse.json();
    expect(errorData.message).toContain('Pet not found');
  });
});
