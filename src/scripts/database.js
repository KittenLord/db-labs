import { Pool } from "pg"

export const pool = new Pool({
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "postgres",
    "database": "s4lab6"
})

function shutdown() {
    pool.end(() => {
        console.log("shutdown");
        process.exit(0);
    });
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

process.on("uncaughtException", e => {
    console.log(e);
    shutdown();
});
