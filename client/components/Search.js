import { useState, useReducer, useEffect } from 'react';
import gql from 'graphql-tag';
import Link from './Link';
import { synchronousReducer } from '../lib/stateManagement';

const initialState = {
  links: [],
  filter: ''
};

const Search = () => {
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

export default Search;
