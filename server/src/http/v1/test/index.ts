import { createPlugin } from "../../../helpers/createPlugin"

export const prefix = "/test"

export const plugin = createPlugin({
  routes: [import("./get"), import("./post")],
})
