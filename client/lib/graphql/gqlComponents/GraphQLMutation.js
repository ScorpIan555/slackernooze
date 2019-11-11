import { Mutation } from 'react-apollo';

const GraphQLMutation = ({ mutation, variables, handleClick }) => {
  console.log('props::', variables);
  console.log('mutation:::', mutation);
  // console.log('')

  return (
    <Mutation mutation={mutation} variables={variables}>
      {postMutation => (
        <button onClick={handleClick}>
          <p>I killed a tramp once, it made me feelhorny</p>
        </button>
      )}
    </Mutation>
  );
};

export default GraphQLMutation;
