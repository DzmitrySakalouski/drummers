export default {
    Query: {
        topics: async (parent, args, { models }) => {
            return await models.Topic.findAll();
        },
        topic: async (parent, { id }, { models }) => {
            return await models.Topic.findByPk(id);
        },
    },

    Mutation: {
        createTopic: async (parent, { name, description }, { models }) => {
            try {
                return await models.Topic.create({
                    name,
                    description,
                });
            } catch (error) {
                throw new Error(error);
            }
        },


        deleteTopic: async (parent, { id }, { models }) => {
            return await models.Topic.destroy({ where: { id } });
        },
    },
}