import { gql } from 'apollo-server-express';
export default gql`
  extend type Query {
    posts: [Post!]!
    postsByTopicId(id: ID!): [Post!]!
    post(id: ID!): Post!
  }
  extend type Mutation {
    createPost(name: String!, description: String!, topicId: String!, userId: String!, files: [Upload!], price: String, isChaffer: Boolean): Answer!
    createEmptyPost(topicId: String!, userId: String!): Id!
    deletePost(id: ID!): Boolean!
  }
  type Id {
    id: String!
  }
  type Post {
    id: ID!
    description: String!
    name: String!
    userId: String!
    createdAt: String!
    topicId: String!
    user: User!
    images: [Image!]
    imageData: [ImageData!]
    price: String
    isChaffer: Boolean
  }
  type Answer {
    msg: String!
  }
  type ImageData {
    type: String!
    data: String!
    postId: String!
  }
`;