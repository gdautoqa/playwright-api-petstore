import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/pet/findByStatus');

test.describe('pet /pet/findByStatus', () => {
  test('GET: Should return success and a list of available pets', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.get(endPoint, {
      params: { status: 'available' }
    });
    expect(response.status()).toBe(200);

    const pets = await response.json();
    expect(Array.isArray(pets)).toBe(true);
    expect(pets.length).toBeGreaterThan(0);

    pets.forEach((pet: any) => {
      expect(pet).toHaveProperty('status', 'available');

      expect(pet).toHaveProperty('id');
      expect(typeof pet.id).toBe('number');

      expect(pet).toHaveProperty('name');
      expect(typeof pet.name).toBe('string');
      expect(pet.name).not.toHaveLength(0);

      expect(pet).toHaveProperty('photoUrls');
      expect(Array.isArray(pet.photoUrls)).toBe(true);

      if ('tags' in pet) {
        expect(Array.isArray(pet.tags)).toBe(true);
      } else {
        console.warn(`Pet with id ${pet.id} does not have a 'tags' property.`);
      }

      if (pet.category) {
        expect(typeof pet.category).toBe('object');
        expect(pet.category).toHaveProperty('id');
        expect(pet.category).toHaveProperty('name');
      }
    });
  });
});
