import { createPlugin } from "../helpers/createPlugin"

export const prefix = "/users"

export const plugin = createPlugin({
  plugins: [import("./test")],
  routes: [import("./get")],
})
