import React, { useState, useCallback, useEffect } from 'react';

// Keeps track of all created functions during the app's life
const functions = new Set();

const Counter = () => {
  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), [delta]);

  // Register the functions so we can count them
  functions.add(incrementDelta);
  functions.add(increment);

  return (
    <div>
      <div> Delta is {delta} </div>
      <div> Counter is {c} </div>
      <br />
      <div>
        <button onClick={incrementDelta}>Increment Delta</button>
        <button onClick={increment}>Increment Counter</button>
      </div>
      <br />
      <div> Newly Created Functions: {functions.size - 2} </div>
    </div>
  );
};

export default Counter;
