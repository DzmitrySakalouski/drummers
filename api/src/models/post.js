const post = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        description: {
            type: DataTypes.STRING,
            // validate: {
            //     notEmpty: {
            //         args: true,
            //         msg: 'A post has to have a description.',
            //     },
            // },
        },
        name: {
            type: DataTypes.STRING,
            // validate: {
            //     notEmpty: {
            //         args: true,
            //         msg: 'A post has to have a name.',
            //     },
            // },
        },
        price: {
            type: DataTypes.STRING,
        },
        isChaffer: {
            type: DataTypes.BOOLEAN,
        },
        userId: {
            type: DataTypes.STRING,
        },
    });

    Post.associate = models => {
        Post.belongsTo(models.Topic);
        Post.hasMany(models.Image);
    };
    return Post;
};
export default post;