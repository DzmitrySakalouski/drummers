export default {
    Mutation: {
        addImage: async (parent, { url, postId }, { models }) => {
            await models.Image.create({
                url, postId
            });

            return 'Done';
        },
    }
}