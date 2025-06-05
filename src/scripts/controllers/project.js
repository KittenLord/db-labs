export const controller = {
    create: async (req, reply) => {
        return "PROJECT create";
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
