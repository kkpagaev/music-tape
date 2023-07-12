import { z } from "zod"
import * as dotenv from "dotenv"

dotenv.config()

const configSchema = z.object({
  PORT: z.number().default(3000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

type Config = z.infer<typeof configSchema>

const config: Config = configSchema.parse(process.env)

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var conf: Config
}

global.conf = config
