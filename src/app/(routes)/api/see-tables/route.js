import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let req = {};
    req.post = (await sql`SELECT * FROM Posts;`).rows;
    req.likes = (await sql`SELECT * FROM Likes;`).rows;
    req.comments = (await sql`SELECT * FROM Comments;`).rows;
    req.pets = (await sql`SELECT * FROM Pets;`).rows;
    return NextResponse.json({ tables: req }, { status: 200 });
}
