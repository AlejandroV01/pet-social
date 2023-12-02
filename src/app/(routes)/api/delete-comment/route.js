import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const commentId = searchParams.get('commentId')
  const admin = searchParams.get('admin')

  if (!commentId || !username || !admin) {
    return NextResponse.json({ error: 'Missing commentId or username or admin prop' }, { status: 400 })
  }
  try {
    let rowCount
    if (!admin) {
      rowCount = (await sql`Select * FROM Comments WHERE id = ${commentId} and pets_username = ${username};`).rowCount
    } else {
      rowCount = (await sql`Select * FROM Comments WHERE id = ${commentId};`).rowCount
    }
    if (rowCount == 0) {
      return NextResponse.json({ error: 'That post does not exist or you do not own it.' }, { status: 403 })
    } else {
      await sql`DELETE FROM Comments WHERE id = ${commentId};`
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const comment = (await sql`SELECT * FROM Comments WHERE pets_username = ${username};`).rows
  return NextResponse.json({ comment }, { status: 200 })
}
