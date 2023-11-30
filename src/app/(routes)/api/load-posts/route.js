import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  try {
    const posts = await sql`
      SELECT p.id, p.pets_username, p.text, pet.petName, pet.petType,
      (SELECT COUNT(*) FROM Likes l WHERE l.posts_id = p.id) AS like_count,
      EXISTS (SELECT 1 FROM Likes l WHERE l.posts_id = p.id AND l.pets_username = ${username}) AS liked_by_user
      FROM Posts p
      JOIN Pets pet ON p.pets_username = pet.username;
    `
    const allPosts = posts.rows
    return NextResponse.json({ allPosts }, { status: 200 })
  } catch (error) {
    const errorMessage = error.message
    console.log(errorMessage)
    return NextResponse.json({ errorMessage }, { status: 500 })
  }
}
