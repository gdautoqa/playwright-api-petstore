import { test, expect } from '../base/BaseApiTest';
import { buildEndpoint } from '../../../utils/apiHelper';
import { BaseApiPage } from '../../../api/base/BaseApiPage';
import { Buffer } from 'buffer';

test.use({ extraHTTPHeaders: {} });

const petId = 123456;
const endPoint = buildEndpoint(`/pet/${petId}/uploadImage`);

test.describe('pet /pet/{petId}/uploadImage', () => {
  test('POST: Should return success', async ({ api }) => {
    const apiClient = new BaseApiPage(api);
    const response = await apiClient.post(endPoint, {
      multipart: {
        additionalMetadata: 'Dummy image upload',
        file: {
          buffer: Buffer.from('dummy file contents'),
          name: 'dummy.jpg',
          mimeType: 'image/jpeg'
        }
      }
    });
    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse.code).toBe(200);
    expect(jsonResponse.type).toBe('unknown');
    expect(jsonResponse.message).toContain("additionalMetadata: Dummy image upload");
    expect(jsonResponse.message).toContain("File uploaded to ./dummy.jpg");
  });
});
