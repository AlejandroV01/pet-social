import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { text, username } = await request.json()

  try {
    if (!text || !username) {
      throw new Error('Items required')
    }

    await sql`INSERT INTO Posts (text, pets_username) VALUES (${text}, ${username});`
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const posts = await sql`SELECT * FROM Posts;`
  return NextResponse.json({ posts }, { status: 200 })
}
