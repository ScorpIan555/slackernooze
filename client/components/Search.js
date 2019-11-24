import { useState, useReducer, useEffect } from 'react';
import gql from 'graphql-tag';
import Link from './Link';
import { synchronousReducer } from '../lib/stateManagement';
import { withApollo } from 'react-apollo';
import { FEED_SEARCH_QUERY } from '../lib/graphql';

const initialState = {
  links: [],
  filter: ''
};

const Search = props => {
  console.log('search.props:::', props);
  //   const [links, setLinks] = useState([]);
  const [state, dispatch] = useReducer(synchronousReducer, initialState);
  const { filter, links } = state;

  // handle controlled form component
  const handleOnChange = event => {
    console.log('onChange:::', event.target.value);
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const _executeSearch = async () => {
    console.log('_executeSearch:::', filter);
    const { filter } = state;
    const result = await props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;
    // this.setState({ links });
    dispatch({ field: 'links', value: links });
  };

  return (
    <div>
      <div>
        Search
        <input
          name="filter"
          value={filter}
          type="text"
          onChange={handleOnChange}
        />
        <button onClick={() => _executeSearch()}>OK</button>
      </div>
      {state.links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default withApollo(Search);
