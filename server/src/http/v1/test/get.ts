import { RouteOptions } from "fastify"

export const options: RouteOptions = {
  method: "GET",
  url: "/",
  handler: async (_req, rep) => {
    return rep.code(200).send({
      foo: "bar",
    })
  },
}
