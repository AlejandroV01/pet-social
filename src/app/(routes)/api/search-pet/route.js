import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const petName = searchParams.get("search");
    try {
        const result = await sql`SELECT * FROM Pets where to_tsvector(username) @@ to_tsquery(${petName});`;
        const pets = result.rows;
        console.log(pets);
        return NextResponse.json({ pets }, { status: 200 });
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return NextResponse.json({ errorMessage }, { status: 500 });
    }
}
