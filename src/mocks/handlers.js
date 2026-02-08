import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'
import { db } from './db'
import { API_URL } from '../config/api'

export const handlers = [
  http.get(`${API_URL}/users`, async () => {
    await delay(1000)
    const users = await db.user.getAll()
    return HttpResponse.json(users)
  }),
  http.get(`${API_URL}/users/:id`, async ({ params }) => {
    const { id } = params
    const user = await db.user.findFirst({ id })
    return HttpResponse.json({ user })
  }),
  http.post(`${API_URL}/users`, async ({ request }) => {
    const { firstName, dateOfBirth, lastName } = await request.json()
    await db.user.create({
      firstName,
      id: faker.string.uuid(),
      dateOfBirth,
      lastName,
    })

    // check if user name already exists

    return HttpResponse.json('User created!', {
      status: 201,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }),
  http.put(`${API_URL}/users/:id`, async ({ request, params }) => {
    const { id } = params
    const { firstName, dateOfBirth, lastName } = await request.json()

    const user = await db.user.findFirst({ id })
    if (!user) {
      // returns with status code 404
      return HttpResponse.json(`User not found`, {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }

    // await db.user.update({
    //   where: {
    //     id: {
    //       equals: id,
    //     },
    //   },
    //   data: { firstName, lastName, dateOfBirth },
    // })

    // Return the updated user object instead of plain text message
    // Frontend mutation expects JSON User object, not text/plain
    // Returning text caused "Failed to execute 'json' on 'Response'" error
    // because response.json() tried to parse "User ${id} edited" as JSON

    const updatedUser = await db.user.update({
      where: { id: { equals: id } },
      data: { firstName, lastName, dateOfBirth },
    })

    return HttpResponse.json(`User ${id} edited`, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }),
  http.delete(`${API_URL}/users/:id`, async ({ params }) => {
    const { id } = params

    const user = await db.user.findFirst({ id })

    if (!user) {
      // returns with status code 404
      return HttpResponse.json(`User not found`, {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }

    await db.user.delete({
      where: {
        id: {
          equals: id,
        },
      },
      strict: true,
    })

    return HttpResponse.json(`User ${id} deleted`, {
      status: 204,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }),
]
