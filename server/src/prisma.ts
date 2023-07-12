import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: conf.DATABASE_URL,
    },
  },
})
