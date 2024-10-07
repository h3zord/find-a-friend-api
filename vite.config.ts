import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      [
        'src/http/controllers/**',
        'prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
    dir: 'src',
  },
})
