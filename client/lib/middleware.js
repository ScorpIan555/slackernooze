import { setContext } from 'apollo-link-context';

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: { authorization: '1234' }
}));

// from apollo-link-context 
// https://www.apollographql.com/docs/link/links/context/

// https://medium.com/open-graphql/react-hooks-for-graphql-3fa8ebdd6c62
