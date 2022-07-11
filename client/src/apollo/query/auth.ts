import { gql } from "@apollo/client";

export const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(object:{ email: $email, password: $password }) {
      name
      email
      token
    }
  }
`;

