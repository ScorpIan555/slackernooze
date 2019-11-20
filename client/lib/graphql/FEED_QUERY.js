import gql from 'graphql-tag';

const FEED_QUERY = gql`
  {
    feed(first: 10, skip: 0, orderBy: createdAt_DESC) {
      links {
        id
        url
        description
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
