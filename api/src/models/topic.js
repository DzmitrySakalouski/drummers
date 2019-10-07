const topic = (sequelize, DataTypes) => {
    const Topic = sequelize.define('topic', {
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A topic has to have a description.',
                },
            },
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A topic has to have a name.',
                },
            },
        },
    });

    Topic.associate = models => {
        Topic.hasMany(models.Post, { onDelete: 'CASCADE' });
    };
    return Topic;
};
export default topic;