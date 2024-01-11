import { sql } from '@vercel/postgres';

type AddNoteInputs = {
    date: string;
    notes: string;
}
export const addNoteAction = async (data: AddNoteInputs) => {
    const { date, notes } = data;
    try {
        console.log('Postgres URL:', process.env.POSTGRES_URL);

        // make sure shift table exists, if not then create it
        await sql`
                DO $$
                BEGIN
                    -- Check if the table exists
                    IF NOT EXISTS (
                        SELECT * FROM information_schema.tables 
                        WHERE table_schema = 'public' AND table_name = 'energynotes'
                    ) THEN
                        -- Create table if it does not exist
                        CREATE TABLE public.energy notes (
                            Id SERIAL PRIMARY KEY, 
                            Date varchar(255), 
                            Notes varchar(255)
                        );
                    END IF;
                END
                $$;
                `;

        // add shift with cleaned form values
        const { rows } = await sql`INSERT INTO energynotes (Date, Notes) VALUES (${date}, ${notes});`;
        console.log({ rows })
        return { success: true, data: rows };

    } catch (error) {
        console.log('Database error occurred', error);
        return { success: false }
    }
}
