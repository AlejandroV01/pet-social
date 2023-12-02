import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function PATCH(request) {
  const { searchParams } = new URL(request.url)
  const commentId = searchParams.get('commentId')
  const username = searchParams.get('username')
  const comment = searchParams.get('comment')
  let postId

  try {
    if (!commentId || !username || !comment) {
      return NextResponse.json({ error: 'Missing commentId or username or comment' }, { status: 400 })
    }

    let result = (await sql`SELECT * FROM Comments WHERE id = ${commentId} AND pets_username = ${username};`).rows[0]

    if (!result) {
      return NextResponse.json({ error: "This comment doesn't exist or you don't own it" }, { status: 400 })
    }
    postId = result.posts_id

    await sql`UPDATE Comments SET comment_text = ${comment} WHERE (id = ${commentId});`
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const comments = (await sql`SELECT * FROM Comments WHERE posts_id = ${postId};`).rows
  return NextResponse.json({ comments }, { status: 200 })
}
