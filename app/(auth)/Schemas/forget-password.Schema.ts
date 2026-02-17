import { z } from 'zod'
export const forgetPasswordSchema = z.object({
  email: z.string().nonempty('email is required').pipe(z.email('invalid email address')),


})
export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>