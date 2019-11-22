import gql from 'graphql-tag';

const feedQueryVars = {
  skip: 0,
  first: 12
};

const queryOptions = {
  variables: feedQueryVars,
  notifyOnNetworkStatusChange: true
};

const FEED_QUERY = gql`
  {
    feed(first: 10, skip: 0, orderBy: createdAt_DESC) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export default FEED_QUERY;
