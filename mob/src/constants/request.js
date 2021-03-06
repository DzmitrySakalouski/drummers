import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql',
    // uri: 'http://10.0.2.2:8000/graphql',
});

export const client = new ApolloClient({
    cache,
    link,
})