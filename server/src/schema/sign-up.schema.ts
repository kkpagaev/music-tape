import { z } from "zod"
import { PASSWORD_MIN_LENGTH } from "../const"

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  username: z.string().min(2),
})

export type SignUp = z.infer<typeof SignUpSchema>
