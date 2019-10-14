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
        createPost: async (parent, { name, description, userId, topicId, files }, { models }) => {
            try {
                const post = await models.Post.create({
                    name,
                    description,
                    topicId,
                    userId,
                });

                files.forEach(async (file) => {
                    await models.Image.create({
                        file, postId: post.id
                    });
                });

                return {msg: 'Done'};                
            } catch (error) {
                console.log(error);
                return error;
            }
        },

        createEmptyPost: async (parent, { userId, topicId }, { models }) => {
            try {
                const post = await models.Post.create({
                    name: '',
                    description: '',
                    topicId,
                    userId,
                });

                return {id: post.id};                
            } catch (error) {
                console.log(error);
                return error;
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
        images: async (post, args, { models }) => {
            return await models.Image.findAll({
                where: {
                    postId: post.id,
                },
            });
        },
    }
}