import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

const endPoint = buildEndpoint('/pet/findByTags');

test.describe('pet /pet/findByTags', () => {
  test('GET: Should return success and a list of available pets', async ({ api }) => {
    const apiClient = new BaseApiPage(api);

    await expect.poll(async () => {
      const response = await apiClient.get(endPoint, { params: { tags: 'example' } });
      return response.status();
    }, { timeout: 10000, intervals: [500] }).toBe(200);

    const response = await apiClient.get(endPoint, { params: { tags: 'example' } });
    expect(response.status()).toBe(200);

    const pets = await response.json();
    expect(Array.isArray(pets)).toBe(true);

    if (pets.length > 0) {
      pets.forEach((pet: any) => {
        expect(pet).toHaveProperty('id');
        expect(typeof pet.id).toBe('number');

        expect(pet).toHaveProperty('name');
        expect(typeof pet.name).toBe('string');
        expect(pet.name).not.toHaveLength(0);

        expect(pet).toHaveProperty('photoUrls');
        expect(Array.isArray(pet.photoUrls)).toBe(true);

        expect(pet).toHaveProperty('tags');
        expect(Array.isArray(pet.tags)).toBe(true);

        pet.tags.forEach((tag: any) => {
          expect(tag).toHaveProperty('id');
          expect(typeof tag.id).toBe('number');
          expect(tag).toHaveProperty('name');
          expect(typeof tag.name).toBe('string');
        });

        if (pet.category) {
          expect(typeof pet.category).toBe('object');
          expect(pet.category).toHaveProperty('id');
          expect(pet.category).toHaveProperty('name');
        }
      });
    } else {
      expect(pets.length).toBe(0);
    }
  });
});