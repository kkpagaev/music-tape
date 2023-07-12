import { createPlugin } from "../../../helpers/createPlugin"

export const prefix = "/auth"

export const plugin = createPlugin({
  routes: [import("./sign-in"), import("./sign-up")],
})
