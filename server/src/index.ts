import fastify from "fastify"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: "Vlad",
      email: "vlad@prisma.io",
    },
  })
  console.log(user)
  return user
}
async function main() {
  const r = fastify()

  r.get("/users", async () => {
    const users = await prisma.user.findMany()
    return users
  })

  r.post("/users", async () => {
    return await createUser()
  })

  r.get("/", async () => {
    return {
      hello: "world!",
    }
  })

  // Run the server!
  const start = async () => {
    try {
      await r.listen({ port: 3000 })
    } catch (err) {
      r.log.error(err)
      process.exit(1)
    }
  }

  await start()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
