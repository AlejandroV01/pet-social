import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  try {
    const currentPet = await sql`SELECT * FROM Pets WHERE username = ${username};`
    if (!currentPet || currentPet.rows.length === 0) {
      return NextResponse.json({ error: 'Requesting from a false username' }, { status: 500 })
    }
    const posts = await sql`
      SELECT p.id, p.pets_username, p.text, pet.petName, pet.petType,
      (SELECT COUNT(*) FROM Likes l WHERE l.posts_id = p.id) AS like_count,
      EXISTS (SELECT 1 FROM Likes l WHERE l.posts_id = p.id AND l.pets_username = ${username}) AS liked_by_user,
      (SELECT JSON_AGG(json_build_object('id', c.id, 'pets_username', c.pets_username, 'comment_text', c.comment_text, 'created_at', c.created_at))
      FROM Comments c 
      WHERE c.posts_id = p.id) AS comments
      FROM Posts p
      JOIN Pets pet ON p.pets_username = pet.username;
    `
    const allPosts = posts.rows
    return NextResponse.json({ allPosts }, { status: 200 })
  } catch (error) {
    const errorMessage = error.message
    return NextResponse.json({ errorMessage }, { status: 500 })
  }
}
