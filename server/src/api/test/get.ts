import { RouteOptions } from "fastify"

export const options = <RouteOptions>{
  method: "GET",
  url: "/",
  handler: async () => {
    return {
      test: "foo",
    }
  },
}
