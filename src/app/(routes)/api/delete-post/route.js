import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const postId = searchParams.get("postId");

    if (!postId || !username) {
        return NextResponse.json(
            { error: "Missing postId or username" },
            { status: 500 }
        );
    }
    try {
        let rowCount = (
            await sql`Select * FROM Posts WHERE id = ${postId} and pets_username = ${username};`
        ).rowCount;
        if (rowCount == 0) {
            return NextResponse.json(
                { error: "That post does not exist or you do not own it." },
                { status: 403 }
            );
        } else {
            await sql`DELETE FROM Posts WHERE id = ${postId} and pets_username = ${username};`;
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const posts = (
        await sql`SELECT * FROM Posts WHERE pets_username = ${username};`
    ).rows;
    return NextResponse.json({ posts }, { status: 200 });
}
