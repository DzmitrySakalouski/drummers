export default {
    Query: {
        posts: async (parent, args, { models }) => {
            return await models.Post.findAll();
        },
        postsByTopicId: async (parent, { id }, { models }) => {
            return await models.Post.findAll({
                where: {
                    topicId: id
                }
            });
        },
    },

    Mutation: {
        createPost: async (parent, { name, description, topicId }, { models }) => {
            try {
                return await models.Post.create({
                    name,
                    description,
                    topicId,
                });
            } catch (error) {
                throw new Error(error);
            }
        },


        deletePost: async (parent, { id }, { models }) => {
            return await models.Post.destroy({ where: { id } });
        },
    },

    Post: {
        user: async (post, args, { models }) => {
            return await models.User.findByPk(post.userId);
        },
    }
}