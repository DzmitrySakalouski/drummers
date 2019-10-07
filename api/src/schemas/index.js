import { gql } from 'apollo-server-express';
import userSchema from './user';
import messageSchema from './message';
import postSchema from './post';
import topicSchema from './topic';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
export default [linkSchema, userSchema, messageSchema, topicSchema, postSchema];