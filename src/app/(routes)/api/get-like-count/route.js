import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json(
            { error: "Missing postId" },
            { status: 500 }
        );
    }

    try {
        let likes = await sql`SELECT * FROM Likes WHERE posts_id = ${postId};`;
        return NextResponse.json(
            { likeCount: likes.rowCount},
            { status: 200 }
        );
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return NextResponse.json({ errorMessage }, { status: 500 });
    }
}
