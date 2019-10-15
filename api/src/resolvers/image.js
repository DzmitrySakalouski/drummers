export default {
    Query: {
        images: async (parent, args, { models }) => {
            return await models.Image.findAll();
        },
    },
    Mutation: {
        addImage: async (parent, { files, postId }, { models }) => {
            files.forEach(async (file) => {
                await models.Image.create({
                    file, postId
                });
            });

            return 'Done';
        },
    }
}