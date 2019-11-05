import GraphQLMutation from '../../components';

export default graphqlHandler = async (name, mutation, variables) => {
  {
    name === 'createNewLink' ? createNewLink(mutation, variables) : null;
  }

  const createNewLink = async (mutation, variables) => {
    return <GraphQLMutation mutation={mutation} variables={variables} />;
  };
};
