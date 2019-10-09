const image = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        url: {
            type: DataTypes.STRING,
        },
    });

    Image.associate = models => {
        Image.belongsTo(models.Post, {
            foreignKey: 'postId'
        });
    };
    return Image;
};
export default image;