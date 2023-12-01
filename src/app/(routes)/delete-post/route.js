import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    try {
        let posts = await sql`DELETE FROM Posts WHERE id = ${postId} RETURNING pets_username;`;
        return NextResponse.json({ posts: posts.rows }, { status: 200 });
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return NextResponse.json({ errorMessage }, { status: 500 });
    }
}
