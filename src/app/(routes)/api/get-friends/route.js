import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const pets_username_1 = searchParams.get('pets_username_1')
  const status = searchParams.get('status')

  try {
    if (!pets_username_1 || !status) {
      throw new Error('Missing required fields')
    }
    let data
    if (status === 'pending') {
      data = await sql`
      SELECT 
        json_build_object(
          'id', p.id,
          'username', p.username,
          'email', p.email,
          'petname', p.petName,
          'pettype', p.petType
        ) AS pets_data_1
      FROM Friends f
      JOIN Pets p ON f.pets_username_1 = p.username
      WHERE f.pets_username_2 = ${pets_username_1} AND f.status = ${status};
    `
    } else if (status === 'accepted') {
      data = await sql`
    SELECT 
      json_build_object(
        'id', CASE WHEN f.pets_username_1 = ${pets_username_1} THEN p2.id ELSE p1.id END,
        'username', CASE WHEN f.pets_username_1 = ${pets_username_1} THEN p2.username ELSE p1.username END,
        'email', CASE WHEN f.pets_username_1 = ${pets_username_1} THEN p2.email ELSE p1.email END,
        'petname', CASE WHEN f.pets_username_1 = ${pets_username_1} THEN p2.petName ELSE p1.petName END,
        'pettype', CASE WHEN f.pets_username_1 = ${pets_username_1} THEN p2.petType ELSE p1.petType END
      ) AS pets_data_1
    FROM Friends f
    JOIN Pets p1 ON f.pets_username_1 = p1.username
    JOIN Pets p2 ON f.pets_username_2 = p2.username
    WHERE 
      (f.pets_username_1 = ${pets_username_1} OR f.pets_username_2 = ${pets_username_1})
      AND f.status = ${status}
      AND (
        (f.pets_username_1 = ${pets_username_1} AND f.pets_username_2 != ${pets_username_1})
        OR
        (f.pets_username_2 = ${pets_username_1} AND f.pets_username_1 != ${pets_username_1})
      );
    `
    }

    const friendData = data.rows
    return NextResponse.json({ friendData }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
