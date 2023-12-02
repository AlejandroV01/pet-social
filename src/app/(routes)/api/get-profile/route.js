import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (!id) {
      throw new Error('Missing required fields')
    }

    const data = await sql`
      SELECT * FROM Pets WHERE id = ${id};
    `
    const petData = data.rows
    return NextResponse.json({ petData }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
