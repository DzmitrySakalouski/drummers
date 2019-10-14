export default {
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