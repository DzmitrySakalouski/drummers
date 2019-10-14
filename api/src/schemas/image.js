import { gql } from 'apollo-server-express';
export default gql`
  type Image {
    file: String!
    postId: String!
  }
  extend type Mutation {
    addImage(
        file: Upload
        postId: String!
    ): String!
  }
`;