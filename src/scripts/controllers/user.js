export const controller = {
    create: async (req, reply) => {
        return "USER create";
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
