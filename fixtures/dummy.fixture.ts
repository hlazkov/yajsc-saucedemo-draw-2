import { test as base } from './auth.fixture';

export const test = base.extend<{test: number}>({
    test: async ({ }, use) => {
        use(10);
    },
});

