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
        const projects = await db.query(
            `select * from "Project"`
        );
        return projects.rows;
    },
    get: async (req, reply) => {
        const { id } = req.params;

        const project = await db.query(
            `select * from "Project" where id = $1`,
            [id]
        );

        return project.rows[0];
    },
    update: async (req, reply) => {
        const { id } = req.params;

        const { newName } = req.body || {};
        if(newName === undefined) {
            return reply.code(400).send({ error: "Invalid data format" });
        }

        const projectUpdate = db.query(
            `update "Project" set name = $1 where id = $2 returning *`,
            [newName, id]
        );

        return projectUpdate.rows[0];
    },
    delete: async (req, reply) => {
        const { id } = req.params;

        const projectDelete = db.query(
            `delete from "Project" where id = $1 returning *`,
            [id]
        );

        return projectDelete.rows[0];
    }
}
