import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, password } = await request.json()

  try {
    if (!email || !password) {
      throw new Error('Items required')
    }

    const pet = await sql`SELECT * FROM Pets WHERE email = ${email};`
    if (!pet || pet.rows.length === 0) {
      return NextResponse.json({ error: 'No account with that email found.' }, { status: 500 })
    }
    if (pet.rows[0].password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 500 })
    }
    const petUser = pet.rows[0]
    return NextResponse.json({ petUser }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
