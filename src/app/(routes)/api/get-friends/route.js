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
          'id', pet1.id,
          'username', pet1.username,
          'email', pet1.email,
          'petname', pet1.petName,
          'pettype', pet1.petType
        ) AS pets_data_1
      FROM Friends f
      JOIN Pets pet1 ON f.pets_username_1 = pet1.username
      WHERE f.pets_username_2 = ${pets_username_1} AND f.status = ${status};
    `
    } else if (status === 'accepted') {
      data = await sql`
      SELECT 
        json_build_object(
          'id', pet1.id,
          'username', pet1.username,
          'email', pet1.email,
          'petname', pet1.petName,
          'pettype', pet1.petType
        ) AS pets_data_1
      FROM Friends f
      JOIN Pets pet1 ON f.pets_username_1 = pet1.username
      WHERE (f.pets_username_1 = ${pets_username_1} OR f.pets_username_2 = ${pets_username_1})
      AND f.status = ${status};
    `
    }

    const friendData = data.rows
    return NextResponse.json({ friendData }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
