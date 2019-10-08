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
    Topic: {
        posts: async (topic, args, { models }) => {
            return await models.Post.findAll({
                where: {
                    topicId: topic.id
                }
            })
        },
        postsForCard: async (topic, args, { models }) => {
            return await models.Post.findAll({
                where: {
                    topicId: topic.id,
                },
                limit: 3,
                order: [['createdAt', 'DESC']]
            })
        }
    }
}