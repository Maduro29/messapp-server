import dotenv from "dotenv";
dotenv.config();

import { v4 as uuidv4 } from "uuid";
import pkg from "pg";

import { encodedPassword } from "../../services/user/encodedPassword.js";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const createUser = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    const id = uuidv4();

    try {
        const client = await pool.connect();
        let result = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [data.email],
        );

        if (result.rows.length > 0) {
            res.json({
                errCode: 2,
                message: "Account belongs to this email is existed!",
            });
        } else {
            result = await client.query("SELECT * FROM users WHERE id = $1", [
                id,
            ]);
            // Generate a new id if the current id already exists in the database
            while (result.rows.length > 0) {
                id = uuidv4();
                result = await client.query(
                    "SELECT * FROM users WHERE id = $1",
                    [id],
                );
            }

            await client.query(
                "INSERT INTO users (id, email, password, avatarlink, phone, dob, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [
                    id,
                    data.email,
                    encodedPassword(data.password),
                    data.avatarlink,
                    data.phone,
                    data.dob,
                    data.gender,
                ],
            );
            res.json({
                errCode: 0,
                message: "Create user successfully!",
            });
        }
    } catch (err) {
        console.error(err);
        console.log(process.env.DATABASE_URL);
        res.json({
            errCode: 1,
            message: "Error!",
        });
    }
};
