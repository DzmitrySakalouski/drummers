import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import models, { sequelize } from './src/models';

import schema from './src/schemas';
import resolvers from './src/resolvers';

const app = express();

// app.use(cors('*'));

const getMe = async req => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            return await jwt.verify(token, 'wr3r23fwfwefwekwself.2456342.dawqdq');
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
};


const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: error => {
        const message = error.message
            .replace('SequelizeValidationError: ', '')
            .replace('Validation error: ', '');
        return {
            ...error,
            message,
        };
    },
    context: async ({ req }) => {
        const me = await getMe(req);

        return {
            models,
            me,
            secret: 'wr3r23fwfwefwekwself.2456342.dawqdq',
        };
    }
});
server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    const createUsersWithMessages = async () => {
        await models.User.create(
            {
                username: 'admin123',
                email: 'admin@admin.com',
                password: 'admin123',
                messages: [
                    {
                        text: 'Published the Road to learn React',
                    },
                ],
            },
            {
                include: [models.Message],
            },
        );
        await models.User.create(
            {
                username: 'ddavids',
                email: 'hello@david.com',
                password: 'ddavids',
                messages: [
                    {
                        text: 'Happy to release ...',
                    },
                    {
                        text: 'Published a complete ...',
                    },
                ],
            },
            {
                include: [models.Message],
            },
        );
        await models.Topic.create(
            {
                name: 'Барахолка',
                description: 'Здесь продают и покупают',
                posts: [
                    {
                        name: 'Happy to release ...',
                        description: 'Some description for this post'
                    },
                    {
                        name: 'Happy to release ...',
                        description: 'Some description for this post'
                    },
                ],
            },
            {
                include: [models.Post],
            },
        );

        await models.Topic.create(
            {
                name: 'Уроки',
                description: 'Учимся и совершенствуем игру',
                posts: [
                    {
                        name: 'Учимся и совершенствуем иг',
                        description: 'Some description for this post. Учимся и совершенствуем иг'
                    },
                    {
                        name: 'Bla bla bla',
                        description: 'Some description for this post. Учимся и совершенствуем иг'
                    },
                ],
            },
            {
                include: [models.Post],
            },
        );
    };

    if (eraseDatabaseOnSync) {
        createUsersWithMessages();
    }

    app.listen({ port: 8000 }, () => {
        console.log('Apollo Server on http://localhost:8000/graphql');
    });
}).catch(err => console.error(err));