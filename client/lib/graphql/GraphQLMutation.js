import { Mutation } from 'react-apollo';

const GraphQLMutation = ({ mutation, variables }) => {
  console.log('props::', variables);

  return (
    <Mutation mutation={mutation} variables={variables}>
      {postMutation => <button onClick={postMutation}>Submit</button>}
    </Mutation>
  );
};

export default GraphQLMutation;
