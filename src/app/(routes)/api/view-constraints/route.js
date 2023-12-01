import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const data = await sql`SELECT
    conname AS constraint_name,
    conrelid::regclass AS table_name,
    a.attname AS column_name,
    condeferrable,
    condeferred,
    contype,
    conkey
FROM
    pg_constraint
JOIN
    pg_attribute AS a ON a.attnum = ANY(pg_constraint.conkey)
ORDER BY
    conrelid::regclass::text,
    conname;
`

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
