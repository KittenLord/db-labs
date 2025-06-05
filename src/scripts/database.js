import { Pool } from "pg"

export const pool = new Pool({
    "host": "localhost",
    "port": 7777,
    "user": "postgres",
    "password": "password",
    "database": "s2lab6"
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
