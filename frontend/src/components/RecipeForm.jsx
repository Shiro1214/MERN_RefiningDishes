import React, { useState } from 'react';

function RecipeForm() {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const recipe = { name, ingredients, instructions }

        const response = await fetch('api/recipes', { //options
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setIngredients('')
            setInstructions('')
            setError(null)
            console.log('new recipe added', json)
        }
    }

    return (
        <form className="recipeForm" onSubmit={handleSubmit}>
            <h2>Add a new Recipe</h2>
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <label>Ingredients</label>
            <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} />
            <label>Instructions</label>
            <textarea type="textarea" value={instructions} onChange={e => setInstructions(e.target.value)} />
            <button>Add Recipe</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
}
export default RecipeForm;
