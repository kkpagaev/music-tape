import { FastifyPluginAsync, RouteOptions } from "fastify"

export interface PluginModule {
  plugin: FastifyPluginAsync
  prefix: string
}

export interface RouteModule {
  options: RouteOptions
}

export interface CreatePluginConfiguration {
  plugins?: (Promise<PluginModule> | PluginModule)[]
  routes?: (Promise<RouteModule> | RouteModule)[]

  extend?: FastifyPluginAsync
}

export const createPlugin = (
  config: CreatePluginConfiguration
): FastifyPluginAsync => {
  return async (fastify, opts) => {
    await Promise.all([
      Promise.all(config.plugins ?? []).then((plugins) =>
        plugins.map((plugin) =>
          fastify.register(plugin.plugin, { prefix: plugin.prefix })
        )
      ),
      Promise.all(config.routes ?? []).then((routes) =>
        routes.map(({ options }) => fastify.route(options))
      ),
      config.extend ? config.extend(fastify, opts) : Promise.resolve(),
    ])
  }
}
