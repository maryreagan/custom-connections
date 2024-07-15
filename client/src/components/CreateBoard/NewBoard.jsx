import React from 'react'

function NewBoard() {
  return (
    <div>
        {/* can create 4 Categories, 4 words per category, difficulty assigned to each category */}
        <h1>Create a board</h1>
        <h2>Category 1</h2>
        <input type="text" placeholder="Word 1" />
        <input type="text" placeholder="Word 2" />
        <input type="text" placeholder="Word 3" />
        <input type="text" placeholder="Word 4" />
        <h2>Category 2</h2>
        <input type="text" placeholder="Word 1" />
        <input type="text" placeholder="Word 2" />
        <input type="text" placeholder="Word 3" />
        <input type="text" placeholder="Word 4" />
        <h2>Category 3</h2>
        <input type="text" placeholder="Word 1" />
        <input type="text" placeholder="Word 2" />
        <input type="text" placeholder="Word 3" />
        <input type="text" placeholder="Word 4" />
        <h2>Category 4</h2>
        <input type="text" placeholder="Word 1" />
        <input type="text" placeholder="Word 2" />
        <input type="text" placeholder="Word 3" />
        <input type="text" placeholder="Word 4" />
        <button>Create</button>
    </div>
  )
}

export default NewBoard