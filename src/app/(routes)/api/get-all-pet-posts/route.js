import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json(
            { error: "Missing username" },
            { status: 500 }
        );
    }

    try {
        let posts =
            await sql`
                SELECT
                    p.id AS id,
                    p.text AS text,
                    p.pets_username AS pets_username,
                    COUNT(l.id) AS like_count
                FROM
                    Posts p
                LEFT JOIN
                    Likes l ON p.id = l.posts_id
                WHERE
                    p.pets_username = ${username}
                GROUP BY
                    p.id, p.pets_username, p.text;`;
        
        return NextResponse.json(
            { posts : posts.rows },
            { status: 200 }
        );
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return NextResponse.json({ errorMessage }, { status: 500 });
    }
}
