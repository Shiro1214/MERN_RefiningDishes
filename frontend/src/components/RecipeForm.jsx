import React, { useState, useEffect } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
function RecipeForm({type , recipe}) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [id, setId] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { dispatch } = useRecipeContext();
    const [emptyFields, setEmptyFields] = useState([]);
    
    useEffect(() => {
        if (type === 'edit' && recipe) {
            setId(recipe._id);
            setName(recipe.name);
            setIngredients(recipe.ingredients);
            setInstructions(recipe.instructions);
        }
    }, [type, recipe]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const recipe = { name, ingredients, instructions }

        //handling either post or patch
        const response = await fetch('api/recipes' + (type === 'create' ? '' : `/${id}`), { //options
            method: type === 'create' ? 'POST' : 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
            
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setSuccess(false)
        }
        if (response.ok) {
            setName('')
            setIngredients('')
            setInstructions('')
            setError(null)
            
            type === 'create' ? dispatch({ type: 'CREATE_RECIPE', payload: json }) : 
                                dispatch({ type: 'UPDATE_RECIPE', payload: json })
            setSuccess(true)
            
        }
    }

    return (
        <form className="recipeForm" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">Recipe {type === 'create' ? 'added' : 'updated'} successfully!</div>}
            <h2>{type === 'create' ? 'Add a new' : 'Update'} Recipe</h2>
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
              onInput = {(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;  
              }}
              />
            <button> {type === 'create' ? 'Add Recipe' : 'Update Recipe'}</button>

           
        </form>
        /* Conditional Rendering
        && is a logical AND operator. 
        In JavaScript, if the value on the left side of && is truthy, the value on the right side is returned. 
        If the value on the left side is falsy, it is returned.
        */
    );
}
export default RecipeForm;
