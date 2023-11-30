import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { posts_id, pets_username, comment_text } = await request.json()

  try {
    if (!posts_id || !pets_username || !comment_text) {
      throw new Error('Items required')
    }

    await sql`INSERT INTO Comments (posts_id, pets_username, comment_text) VALUES (${posts_id}, ${pets_username}, ${comment_text});`
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const posts = await sql`SELECT * FROM Posts;`
  return NextResponse.json({ posts }, { status: 200 })
}
