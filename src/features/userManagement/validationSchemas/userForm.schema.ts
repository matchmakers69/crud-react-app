import { z } from 'zod'

export const userFormSchema = z.object({
  firstName: z.string().transform((val) => val.trim()),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .transform((val) => val.trim()),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (dateStr) => {
        const date = new Date(dateStr)
        const today = new Date()
        return date <= today
      },
      { message: 'Date of birth cannot be in the future' },
    ),
})

export type UserFormData = z.infer<typeof userFormSchema>
