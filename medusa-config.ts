import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "medusa-payu-payment-plugin/providers/payu",
            id: "payu",
            options: {
              merchantKey: process.env.PAYU_MERCHANT_KEY,
              merchantSalt: process.env.PAYU_MERCHANT_SALT,
              environment: process.env.PAYU_ENVIRONMENT || "test",
            },
          },
        ],
      },
    },
  ],
})
