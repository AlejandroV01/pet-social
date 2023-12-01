import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const username = searchParams.get("username");

    if (!postId || !username) {
        return NextResponse.json(
            { error: "Missing postId or username" },
            { status: 400 }
        );
    }

    try {
        let res =
            await sql`SELECT * FROM Likes WHERE posts_id = ${postId} AND pets_username = ${username};`;
        if (res.rowCount == 0) {
            await sql`INSERT INTO Likes (posts_id, pets_username) VALUES (${postId}, ${username});`;
        } else {
            await sql`DELETE FROM Likes WHERE posts_id = ${postId} and pets_username = ${username};`;
        }

        let likes = await sql`SELECT * FROM Likes WHERE posts_id = ${postId};`;
        return NextResponse.json(
            { likeCount: likes.rowCount },
            { status: 200 }
        );
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return NextResponse.json({ errorMessage }, { status: 500 });
    }
}
