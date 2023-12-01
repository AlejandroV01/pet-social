import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const username = searchParams.get("username");

  if (!text || !username) {
      return NextResponse.json({ error: "Missing username or text" }, { status: 400 });
  }


  try {
    if (!text || !username) {
      throw new Error('Items required')
    }

    await sql`INSERT INTO Posts (text, pets_username) VALUES (${text}, ${username});`
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const posts = (await sql`SELECT * FROM Posts WHERE pets_username = ${username};`).rows
  return NextResponse.json({ posts }, { status: 200 })
}
