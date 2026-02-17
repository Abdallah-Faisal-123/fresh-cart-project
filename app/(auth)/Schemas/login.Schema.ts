import {z} from 'zod'
export const loginSchima = z.object({
  email:z.string().nonempty('email is required').pipe(z.email('invalid email address')),
  password:z.string().nonempty('password is required'),
  remember:z.boolean()
  
})
export type LoginFormValues = z.infer<typeof loginSchima>