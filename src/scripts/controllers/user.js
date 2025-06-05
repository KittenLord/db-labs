import { pool as db } from "../database.js"

export const controller = {
    create: async (req, reply) => {
        const { nickname, email, password, photo } = req.body || {};
        if(nickname === undefined || email === undefined || password === undefined) {
            return reply.code(400).send({ error: "Invalid data format" });
        }

        const newUser = await db.query(
            `insert into "User" (nickname, email, password, photo) values ($1, $2, $3, $4) returning *`,
            [nickname, email, password, photo]
        );

        return newUser.rows[0];
    },
    getAll: async (req, reply) => {
        const users = await db.query(
            `select * from "User"`
        );

        return users.rows;
    },
    get: async (req, reply) => {
        const { id } = req.params;
    
        const user = await db.query(
            `select * from "User" where id = $1`,
            [id]
        );

        return user.rows[0];
    },
    getProjects: async (req, reply) => {
        const { id } = req.params;

        const projectIds = await db.query(
            `select * from "User_Project" where user_id = $1`,
            [id]
        );

        return projectIds.rows;
    },
    update: async (req, reply) => {
        const { id } = req.params;

        const { newNickname, newEmail, newPassword, newPhoto } = req.body || {};
        if(nickname === undefined || email === undefined || password === undefined) {
            return reply.code(400).send({ error: "Invalid data format" });
        }

        const userUpdate = await db.query(
            `update "User" set nickname = $1, email = $2, password = $3, photo = $4 where id = $5 returning *`,
            [newNickname, newEmail, newPassword, newPhoto, id]
        );

        return userUpdate.rows[0];
    },
    delete: async (req, reply) => {
        const { id } = req.params;

        const userDelete = await db.query(
            `delete from "User" where id = $1 returning *`,
            [id]
        );

        return userDelete.rows[0];
    }
}
