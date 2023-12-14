import React, { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
function RecipeForm() {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [error, setError] = useState(null);
    const { dispatch } = useRecipeContext();
    const [emptyFields, setEmptyFields] = useState([]);
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
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setIngredients('')
            setInstructions('')
            setError(null)
            console.log('new recipe added', json)
            dispatch({ type: 'CREATE_RECIPE', payload: json })
        }
    }

    return (
        <form className="recipeForm" onSubmit={handleSubmit}>
            <h2>Add a new Recipe</h2>
            <label>Name</label>
            <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className={emptyFields.includes('name') ? "error" : ""}
                />
            <label>Ingredients</label>
            <textarea 
                value={ingredients} 
                onChange={e => setIngredients(e.target.value)}
                className={emptyFields.includes('ingredients') ? "error" : ""}
                />
            <label>Instructions</label>
            <textarea 
              type="textarea" 
              value={instructions} 
              onChange={e => setInstructions(e.target.value)}
              className = {emptyFields.includes('instructions') ? "error" : ""}
              />
            <button>Add Recipe</button>

            {error && <div className="error">{error}</div>}
        </form>
        /* Conditional Rendering
        && is a logical AND operator. 
        In JavaScript, if the value on the left side of && is truthy, the value on the right side is returned. 
        If the value on the left side is falsy, it is returned.
        */
    );
}
export default RecipeForm;
