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
    if (status === 'pending') {
      await sql`
      INSERT INTO Friends (pets_username_1, pets_username_2, status, created_at)
      VALUES (${pets_username_1}, ${pets_username_2}, ${status}, NOW());
    `
    } else if (status === 'accepted') {
      await sql`
      UPDATE Friends
      SET status = ${status}
      WHERE pets_username_1 = ${pets_username_1} AND pets_username_2 = ${pets_username_2};
    `
    } else if (status === 'remove' || status === 'decline') {
      await sql`
      DELETE FROM Friends
      WHERE (pets_username_1 = ${pets_username_1} AND pets_username_2 = ${pets_username_2})
      OR (pets_username_1 = ${pets_username_2} AND pets_username_2 = ${pets_username_1});
    `
    } else {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
