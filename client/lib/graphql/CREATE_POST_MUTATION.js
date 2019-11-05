import gql from 'graphql-tag';

const CREATE_POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      # createdAt
      url
      description
    }
  }
`;

export default CREATE_POST_MUTATION;
