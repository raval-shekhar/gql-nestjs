import { gql } from "@apollo/client";

export const createPostMutation = gql`
  mutation create($title: String!, $description: String!, $image: String!) {
    create(
      object: { title: $title, description: $description, image: $image }
    ) {
      title
      description
      image
    }
  }
`;
