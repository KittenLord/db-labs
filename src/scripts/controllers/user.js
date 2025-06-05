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
        return "USER getAll";
    },
    get: async (req, reply) => {
        const { id } = req.params;
        return "USER get " + id;
    },
    getProjects: async (req, reply) => {
        const { id } = req.params;
        return "USER getProjects " + id;
    },
    update: async (req, reply) => {
        const { id } = req.params;
        return "USER update " + id;
    },
    delete: async (req, reply) => {
        const { id } = req.params;
        return "USER delete " + id;
    }
}
