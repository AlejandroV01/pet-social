import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json(
            { error: "Missing postId" },
            { status: 400 }
        );
    }

    try {
        let likes = await sql`SELECT * FROM vw_PostExtendsLike WHERE id = ${postId};`;
        if (likes.rowCount===0){
            return NextResponse.json(
                { likeCount: 0},
                { status: 200 }
            );
        }
        return NextResponse.json(
            { likeCount: likes.rows[0].count},
            { status: 200 }
        );
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return NextResponse.json({ errorMessage }, { status: 500 });
    }
}
