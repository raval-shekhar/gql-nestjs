import { gql } from "@apollo/client";

export const PostFragment = gql`
  fragment PostFragment on posts {
    titl
    image
    description
    user {
      name
      email
    }
  }
`;

