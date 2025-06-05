import Fastify from "fastify"

import { pool } from "./database.js"
import { projectRoutes } from "./routes/project.js"
import { userRoutes } from "./routes/user.js"

const fastify = Fastify({ logger: true });

fastify.register(projectRoutes, { prefix: "/api/project" })
fastify.register(userRoutes, { prefix: "/api/user" })

fastify.listen({ port: 7777 }, e => {
    if(e) throw e;
})
