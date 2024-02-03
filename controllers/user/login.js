import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
import { comparePassword } from "../../services/user/comparePassword.js";
const { Pool } = pkg;

import { encodedPassword } from "../../services/user/encodedPassword.js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const login = async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const client = await pool.connect();
        let result = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [data.email],
        );

        if (result.rows.length === 0) {
            res.json({
                errCode: 2,
                message: "Account belongs to this email is not existed!",
            });
        } else {
            let user = result.rows[0];
            let isPwRight = comparePassword(data.password, user.password);
            if (isPwRight) {
                const _user = user;
                delete _user.password;
                res.json({
                    errCode: 0,
                    message: "Login successfully!",
                    user: _user,
                });
            } else {
                res.json({
                    errCode: 3,
                    message: "Wrong password!",
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.json({
            errCode: 1,
            message: "Error!",
        });
    }
};
