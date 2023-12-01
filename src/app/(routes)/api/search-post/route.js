import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const postSearch = searchParams.get("search");

    if (!postSearch) {
        return NextResponse.json({ error: "Missing search" }, { status: 400 });
    }

    try {
        const result =
            await sql`SELECT * FROM Posts where to_tsvector(text) @@ to_tsquery(${postSearch});`;
        const posts = result.rows;
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return NextResponse.json({ errorMessage }, { status: 500 });
    }
}
