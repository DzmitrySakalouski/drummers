const image = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        file: {
            type: DataTypes.BLOB,
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