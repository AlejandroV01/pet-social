import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const admin = searchParams.get('admin')

  if (!username || !admin) {
    return NextResponse.json({ error: 'Missing username or admin prop' }, { status: 400 })
  }
  try {
    let rowCount
    if (!admin) {
      return NextResponse.json({ error: 'You must be an admin to execute this' }, { status: 403 })
    } else {
      rowCount = (await sql`Select * FROM Pets WHERE username = ${username};`).rowCount
    }
    if (rowCount == 0) {
      return NextResponse.json({ error: 'That user does not exist.' }, { status: 403 })
    } else {
      await sql`DELETE FROM Comments WHERE pets_username = ${username};`
      await sql`DELETE FROM Posts WHERE pets_username = ${username};`
      await sql`DELETE FROM Likes WHERE pets_username = ${username};`
      await sql`DELETE FROM Friends WHERE pets_username_1 = ${username} OR pets_username_2 = ${username};`
      await sql`DELETE FROM Pets WHERE username = ${username};`
    }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const pets = (await sql`SELECT * FROM Pets;`).rows
  return NextResponse.json({ pets }, { status: 200 })
}
