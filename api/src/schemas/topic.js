import { gql } from 'apollo-server-express';
export default gql`
  extend type Query {
    topics: [Topic!]!
    topic(id: ID!): Topic!
  }
  extend type Mutation {
    createTopic(name: String!, description: String!): Topic!
    deleteTopic(id: ID!): Boolean!
  }
  type Topic {
    id: ID!
    description: String!
    name: String!
    posts: [Post!]
    postsForCard: [Post!]
  }
`;