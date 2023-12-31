import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const postId = searchParams.get('postId')
  const admin = searchParams.get('admin')

  if (!postId || !username || !admin) {
    return NextResponse.json({ error: 'Missing postId or username or admin prop' }, { status: 400 })
  }
  try {
    let rowCount
    if (!admin) {
      rowCount = (await sql`Select * FROM Posts WHERE id = ${postId} and pets_username = ${username};`).rowCount
    } else {
      rowCount = (await sql`Select * FROM Posts WHERE id = ${postId};`).rowCount
    }
    if (rowCount == 0) {
      return NextResponse.json({ error: 'That post does not exist or you do not own it.' }, { status: 403 })
    } else {
      await sql`DELETE FROM Likes WHERE posts_id = ${postId};`
      await sql`DELETE FROM Comments WHERE posts_id = ${postId};`
      await sql`DELETE FROM Posts WHERE id = ${postId};`
    }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const posts = (await sql`SELECT * FROM Posts WHERE pets_username = ${username};`).rows
  return NextResponse.json({ posts }, { status: 200 })
}
