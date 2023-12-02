import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const pets_username_1 = searchParams.get('pets_username_1')
  const pets_username_2 = searchParams.get('pets_username_2')
  const status = searchParams.get('status')

  try {
    if (!pets_username_1 || !pets_username_2 || !status) {
      throw new Error('Missing required fields')
    }

    await sql`
      INSERT INTO Friends (pets_username_1, pets_username_2, status, created_at)
      VALUES (${pets_username_1}, ${pets_username_2}, ${status}, NOW());
    `

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
