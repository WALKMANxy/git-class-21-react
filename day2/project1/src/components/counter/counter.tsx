import React, { useState } from 'react';

export const Counter = () => {

    useState(0)
    let [x, setX] = useState(0)
    return <div>
        {x}
        <button onClick={() => setX(x +1)}> Increment </button>
        <button onClick={() => setX(x -1)}> Decrement </button>
    </div>
}


export default Counter;