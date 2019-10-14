export default {
    Mutation: {
        addImage: async (parent, { file, postId }, { models }) => {
            await models.Image.create({
                file, postId
            });

            return 'Done';
        },
    }
}