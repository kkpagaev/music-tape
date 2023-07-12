import { z } from "zod"
import { PASSWORD_MIN_LENGTH } from "../const"

export const SignInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .strict()

export type SignIn = z.infer<typeof SignInSchema>
