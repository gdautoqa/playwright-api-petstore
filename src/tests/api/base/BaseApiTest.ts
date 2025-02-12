import { test as base, expect } from '@playwright/test';
import { BaseApiPage } from '../../../api/base/BaseApiPage';

export class BaseApiTest {}

type ApiFixtures = {
  api: BaseApiPage;
};

const test = base.extend<ApiFixtures>({
  api: async ({ request }, use) => {
    const apiPage = new BaseApiPage(request);
    await use(apiPage);
  },
});

export { test, expect };
