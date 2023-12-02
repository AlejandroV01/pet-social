import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const pets_username_1 = searchParams.get('u1')
    const pets_username_2 = searchParams.get('u2')
    const status = searchParams.get('s')

    let res = [];
    await sql`DROP PROCEDURE IF EXISTS update_friend(
        user1 IN VARCHAR,
        user2 IN VARCHAR,
        status IN VARCHAR,
        output OUT VARCHAR
    )`;
    await sql`DROP FUNCTION IF EXISTS update_friend(
        user1 IN VARCHAR,
        user2 IN VARCHAR,
        status IN VARCHAR,
        output OUT VARCHAR
    )`;

    

    let sqlRes;
    sqlRes = await sql`
    CREATE PROCEDURE update_friend(
        user1 IN VARCHAR,
        user2 IN VARCHAR,
        status IN VARCHAR,
        output OUT VARCHAR
    )
    LANGUAGE plpgsql
    as $$
    begin
        IF user1 = user2 then
            output :=  'Sorry but you can not be friends with yourself';
            return;
        END IF;

        IF status NOT IN ('pending', 'accepted', 'remove', 'decline') then
            output :=  'Status is not valid';
            return;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pets WHERE username = user1) OR NOT EXISTS (SELECT 1 FROM pets WHERE username = user2) THEN
            output :=  'One of the users does not exist';
            RETURN;
        END IF;

        IF status = 'pending' then
            IF EXISTS (
                SELECT * FROM Friends 
                    WHERE (pets_username_1 = user1 AND pets_username_2 = user2)
                    OR (pets_username_1 = user2 AND pets_username_2 = user1)
                    AND Friends.status = 'accepted'
            ) THEN
                output :=  'Already friends';
                RETURN;
            ELSIF  EXISTS (
                SELECT * FROM Friends 
                    WHERE (pets_username_1 = user1 AND pets_username_2 = user2)
                    OR (pets_username_1 = user2 AND pets_username_2 = user1)
                    AND Friends.status = 'pending'
            ) THEN
                output :=  'Already Requested';
                RETURN;
            ELSE
                INSERT INTO Friends (pets_username_1, pets_username_2, status, created_at)
                VALUES (user1, user2, status, NOW()); 
                output :=  'Friend Request sent!!!';
                RETURN;
            RETURN;
            END IF;
        END IF;
        output := 'Success';
        RETURN;
    end;$$

    `;

    console.log(pets_username_1, pets_username_2, status);
    // sqlRes = await sql`call update_friend('${pets_username_1}', '${pets_username_2}', '${status}', '${''}');`;
    sqlRes = await sql`call update_friend('Flying', 'the_tom', 'pending', '');`;

    let { rowCount, rows } = sqlRes;
    res.push(rowCount);
    res.push(rows);
    res.push(sqlRes);
    console.log(res);
    return NextResponse.json(res, { status: 200 });
}
