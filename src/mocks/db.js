import { faker } from '@faker-js/faker'
import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  // Create a "user" model,
  user: {
    // ...with these properties and value getters.
    id: primaryKey(faker.string.uuid),
    firstName: () => '',
    lastName: () => faker.person.lastName(),
    dateOfBirth: () =>
      faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).toISOString().split('T')[0], // Format: YYYY-MM-DD
  },
})
