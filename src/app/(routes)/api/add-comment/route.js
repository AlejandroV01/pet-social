import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const username = searchParams.get("username");
    const comment = searchParams.get("username");

    try {
        if (!postId || !username || !comment) {
        return NextResponse.json({ error: "Missing postId or username or comment" }, { status: 400 });
        }

        await sql`INSERT INTO Comments (posts_id, pets_username, comment_text) VALUES (${postId}, ${username}, ${comment});`;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const posts = (await sql`SELECT * FROM Comments WHERE posts_id = ${postId};`).rows;
    return NextResponse.json({ posts }, { status: 200 });
}
