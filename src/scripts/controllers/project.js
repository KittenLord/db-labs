import { pool as db } from "../database.js"

export const controller = {
    create: async (req, reply) => {
        const { userId, projectName } = req.body || {};
        if(userId === undefined || projectName === undefined) {
            return reply.code(400).send({ error: "Invalid data format" });
        }

        const newProject = await db.query(
            `insert into "Project" (name) values ($1) returning *`,
            [projectName]
        );
        const userRelation = await db.query(
            `insert into "User_Project" (user_id, project_id, role_id, team_id) values ($1, $2, null, null)`,
            [userId, newProject.rows[0]["id"]]
        );
        return newProject.rows[0];
    },
    getAll: async (req, reply) => {
        return "PROJECT getAll";
    },
    get: async (req, reply) => {
        const { id } = req.params;
        return "PROJECT get " + id;
    },
    update: async (req, reply) => {
        const { id } = req.params;
        return "PROJECT update " + id;
    },
    delete: async (req, reply) => {
        const { id } = req.params;
        return "PROJECT delete " + id;
    }
}
