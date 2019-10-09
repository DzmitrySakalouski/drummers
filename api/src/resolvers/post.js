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
        createPost: async (parent, { name, description, userId, topicId, urls }, { models }) => {
            try {
                const post = await models.Post.create({
                    name,
                    description,
                    topicId,
                    userId,
                });
                const runImgCreation = () => {
                    Promise.all(
                        urls.map(async image => {
                            await models.Image.create({ url: image, postId: post.id });
                        })
                    );
                }

                runImgCreation();
                return 'Done';                
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
        images: async (post, args, { models }) => {
            return await models.Image.findAll({
                where: {
                    postId: post.id,
                },
            });
        },
    }
}