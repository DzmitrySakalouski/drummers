import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'itaeventsdb',
    'dzmitry',
    '1234567',
    {
        dialect: 'postgres',
    }
);

const models = {
    User: sequelize.import('./user'),
    Message: sequelize.import('./message'),
    Post: sequelize.import('./post'),
    Topic: sequelize.import('./topic'),
    Image: sequelize.import('./image'),
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export default models;

export {sequelize};