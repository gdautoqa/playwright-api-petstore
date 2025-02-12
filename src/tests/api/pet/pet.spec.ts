import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/pet');

test.describe('pet /pet', () => {
  test('POST: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const petData = {
      id: 987654,
      category: { id: 1, name: 'Dogs' },
      name: 'TestPet',
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [{ id: 1, name: 'tag1' }],
      status: 'available'
    };
    const response = await apiClient.post(endPoint, { data: petData });
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(responseData.id).toBe(petData.id);
    expect(responseData.name).toBe(petData.name);
    expect(responseData.status).toBe(petData.status);

    expect(responseData.category).toEqual(petData.category);
    expect(responseData.photoUrls).toEqual(petData.photoUrls);
    expect(responseData.tags).toEqual(petData.tags);
  });

  test('PUT: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const updatedPetData = {
      id: 987654,
      category: { id: 1, name: 'Dogs' },
      name: 'UpdatedTestPet',
      photoUrls: ['https://example.com/photo-updated.jpg'],
      tags: [{ id: 1, name: 'tag1' }],
      status: 'sold'
    };
    const response = await apiClient.put(endPoint, { data: updatedPetData });
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(responseData.id).toBe(updatedPetData.id);
    expect(responseData.name).toBe(updatedPetData.name);
    expect(responseData.status).toBe(updatedPetData.status);

    expect(responseData.category).toEqual(updatedPetData.category);
    expect(responseData.photoUrls).toEqual(updatedPetData.photoUrls);
    expect(responseData.tags).toEqual(updatedPetData.tags);
  });
});
