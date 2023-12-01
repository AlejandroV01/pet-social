import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const petUsername = searchParams.get("petUsername");

    if (!postId || !petUsername) {
        return NextResponse.json(
            { error: "Missing postId or petUsername" },
            { status: 500 }
        );
    }

    try {
        let res =
            await sql`SELECT * FROM Likes WHERE posts_id = ${postId} AND pets_username = ${petUsername};`;
        if (res.rowCount == 0) {
            await sql`INSERT INTO Likes (posts_id, pets_username) VALUES (${postId}, ${petUsername});`;
        } else {
            await sql`DELETE FROM Likes WHERE posts_id = ${postId} and pets_username = ${petUsername};`;
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
