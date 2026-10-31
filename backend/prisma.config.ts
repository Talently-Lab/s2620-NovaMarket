import "dotenv/config";
import { defineConfig, env} from "prisma/config";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
  datasource: {
    url: env(isProd ? "DIRECT_URL" : "DIRECT_URL_DEV"),
  },
});