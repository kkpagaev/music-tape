import { createPlugin } from "../../helpers/createPlugin"

export const prefix = "/v1"

export const plugin = createPlugin({
  plugins: [import("./test"), import("./auth")],
})
