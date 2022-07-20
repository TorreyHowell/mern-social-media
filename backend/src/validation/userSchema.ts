import { object, string, date, preprocess, infer, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    userName: string({
      required_error: 'A username is required',
    }),
    email: string({
      required_error: 'An email is required',
    }).email('not a valid email'),
    password: string({
      required_error: 'A password is required',
    }).min(6, 'Minimum 6 characters required for password'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    firstName: string().default(''),
    lastName: string().default(''),
    dob: preprocess(
      (arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
      },
      date({
        required_error: 'A dob is required',
      })
    ),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>
