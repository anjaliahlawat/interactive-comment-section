import React, {useState} from 'react';

export function Form() {
    const [input, setInput] = useState(1);
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const hanbleSubmit = (e) => {

    }

    return (
        <form onSubmit={hanbleSubmit}> 
            <button onClick={handleInput}>Click</button>
            <p>{input}</p>
        </form>
    )
}

