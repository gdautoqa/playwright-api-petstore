import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const findByStatusEndpoint = buildEndpoint('/pet/findByStatus');
const createPetEndpoint = buildEndpoint('/pet');

// Create a pet payload with all the necessary properties.
const newPet = {
  id: Date.now(), // unique id
  category: { id: 1, name: 'TestCategory' },
  name: 'TestPetName',
  photoUrls: ['https://example.com/photo.jpg'],
  tags: [{ id: 1, name: 'test' }],
  status: 'available'
};

test.describe('pet /pet/findByStatus', () => {
  test.beforeAll(async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    // Create a pet so that you are guaranteed a pet with a "name" in the response.
    const response = await apiClient.post(createPetEndpoint, { data: newPet });
    expect(response.status()).toBe(200);
  });

  test('GET: Should return success and a list of available pets', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.get(findByStatusEndpoint, { params: { status: 'available' } });
    expect(response.status()).toBe(200);

    const pets = await response.json();
    expect(Array.isArray(pets)).toBe(true);
    expect(pets.length).toBeGreaterThan(0);

    // Filter the pet list to locate the one created in the beforeAll hook.
    const createdPet = pets.find((pet: any) => pet.id === newPet.id);
    expect(createdPet).toBeDefined();
    expect(createdPet).toHaveProperty('name', newPet.name);
    expect(typeof createdPet.name).toBe('string');
    expect(createdPet.name).not.toHaveLength(0);

    // Additional assertions for other properties.
    expect(createdPet).toHaveProperty('photoUrls');
    expect(Array.isArray(createdPet.photoUrls)).toBe(true);
    if (createdPet.category) {
      expect(typeof createdPet.category).toBe('object');
      expect(createdPet.category).toHaveProperty('id');
      expect(createdPet.category).toHaveProperty('name');
    }
  });
});
