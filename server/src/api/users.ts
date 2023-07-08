import { FastifyPluginAsync } from "fastify"

export const userPlugin: FastifyPluginAsync = async (fastify) => {
  const get = import("./get")
}
