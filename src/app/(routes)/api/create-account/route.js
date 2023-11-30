import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const email = searchParams.get('email')
  const password = searchParams.get('password')
  const petName = searchParams.get('petName')
  const petType = searchParams.get('petType')

  try {
    if (!username || !email || !password || !petName || !petType) throw new Error('Pet and owner names required')
    await sql`INSERT INTO Pets (username, email, password, petName, petType) VALUES (${username}, ${email}, ${password}, ${petName}, ${petType});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  const pets = await sql`SELECT * FROM Pets;`
  return NextResponse.json({ pets }, { status: 200 })
}
