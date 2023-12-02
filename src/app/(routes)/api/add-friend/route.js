import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const pets_username_1 = searchParams.get("pets_username_1");
    const pets_username_2 = searchParams.get("pets_username_2");
    const status = searchParams.get("status");

    try {
        if (!pets_username_1 || !pets_username_2 || !status) {
            throw new Error("Missing required fields");
        }

        if (
            "pending" !== status &&
            "accepted" !== status &&
            "remove" !== status &&
            "decline" !== status
        ) {
            return NextResponse.json(
                {
                    error: "Status should be 'pending', 'accepted', 'remove' or 'decline'",
                },
                { status: 500 }
            );
        }
        
        let response =
            await sql`call update_friend(${pets_username_1}, ${pets_username_2}, ${status}, '');`;
        return NextResponse.json(
            { success: true, output: response.rows[0].output },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
