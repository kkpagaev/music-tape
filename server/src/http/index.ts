import { ZodSchema } from "zod"
import { createPlugin } from "../helpers/createPlugin"
import { HttpException } from "./exceptions/http-exception"
import { UnprocessableEntityException } from "./exceptions/unprocessable-entity.exceptions"

export const prefix = "/api"

export const plugin = createPlugin({
  plugins: [import("./v1")],
  routes: [import("./get")],
  extend: async (f) => {
    f.setValidatorCompiler(({ schema }: { schema: ZodSchema }) => {
      return (data) => {
        const result = schema.safeParse(data)
        if (result.success === true) {
          return result.data
        } else {
          throw new UnprocessableEntityException(result.error.errors)
        }
      }
    }).setErrorHandler<HttpException>(async (error, request, reply) => {
      if ("status" in error) {
        return reply.status(error.status).send({
          status: error.status,
          message: error.message,
          details: error.details,
        })
      } else {
        request.server.log.error(error)

        return reply.status(500).send({
          status: 500,
          message: "Internal Server Error",
        })
      }
    })
  },
})
