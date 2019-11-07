import { Mutation } from 'react-apollo';

const GraphQLMutation = ({ mutation, variables }) => {
  console.log('props::', variables);

  return (
    <Mutation mutation={mutation} variables={variables}>
      {postMutation => (
        <button onClick={postMutation}>
          <p>I killed a tramp once, it made me feelhorny</p>
        </button>
      )}
    </Mutation>
  );
};

export default GraphQLMutation;
