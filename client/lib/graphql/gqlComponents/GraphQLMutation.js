import { Mutation } from 'react-apollo';

const GraphQLMutation = ({ mutation, variables, handleAwsCall }) => {
  console.log('variables::', variables);
  console.log('mutation:::', mutation);

  return (
    <Mutation mutation={mutation} variables={variables}>
      {handleMutation => (
        <button
          onClick={() => {
            {
              handleAwsCall != null ? handleAwsCall() : null;
            }
            handleMutation();
          }}
        >
          <p>I killed a tramp once, it made me feelhorny</p>
        </button>
      )}
    </Mutation>
  );
};

export default GraphQLMutation;

/*
while declarative and recommended in the howtographql tut,
in the future will wanna use the useMutation hook as the Mutation
component utilizes the render prop pattern, which hooks improve upon..

preferred way to do this in the future would be:
  // const [createPost, { loading }] = useMutation(POST_MUTATION);
  let name, email, password;
  let params = {
    name,
    email,
    password
  };

*/
