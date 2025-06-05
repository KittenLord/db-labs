import { controller } from "../controllers/project.js"

export async function projectRoutes(fastify) {
    fastify.post("/", controller.create);
    fastify.get("/", controller.getAll);
    fastify.get("/:id", controller.get);
    fastify.put("/:id", controller.update);
    fastify.delete("/:id", controller.delete);
}
