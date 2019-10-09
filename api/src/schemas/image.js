import { gql } from 'apollo-server-express';
export default gql`
  type Image {
    url: String!
    postId: String!
  }
  extend type Mutation {
    addImage(
        url: String!
        postId: String!
    ): String!
  }
`;