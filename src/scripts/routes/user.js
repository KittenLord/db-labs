import { controller } from "../controllers/user.js"

export async function userRoutes(fastify) {
    fastify.post("/", controller.create);
    fastify.get("/", controller.getAll);
    fastify.get("/:id", controller.get);
    fastify.get("/:id/project", controller.getProjects);
    fastify.put("/:id", controller.update);
    fastify.delete("/:id", controller.delete);
}
