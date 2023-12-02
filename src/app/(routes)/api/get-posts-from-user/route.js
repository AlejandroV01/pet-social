import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Missing username' }, { status: 400 })
  }

  try {
    const data = await sql`
    SELECT 
    p.id, 
    p.pets_username, 
    p.text, 
    pet.petName, 
    pet.petType,
    (SELECT COUNT(*) FROM Likes l WHERE l.posts_id = p.id) AS like_count,
    EXISTS (SELECT 1 FROM Likes l WHERE l.posts_id = p.id AND l.pets_username = ${username}) AS liked_by_user,
    (SELECT JSON_AGG(
        json_build_object(
            'id', c.id, 
            'pets_username', c.pets_username, 
            'comment_text', c.comment_text, 
            'created_at', c.created_at,
            'pet_info', json_build_object('petName', pet.petName, 'petType', pet.petType)
        )
      )
    FROM Comments c 
    JOIN Pets pet ON c.pets_username = pet.username
    WHERE c.posts_id = p.id) AS comments
  FROM 
    Posts p
  JOIN 
    Pets pet ON p.pets_username = pet.username
    WHERE p.pets_username = ${username}
    ORDER BY p.id DESC;
        `
    const posts = data.rows
    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    const errorMessage = error.message
    console.log(errorMessage)
    return NextResponse.json({ errorMessage }, { status: 500 })
  }
}
