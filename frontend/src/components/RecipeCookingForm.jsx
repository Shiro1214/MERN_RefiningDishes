import React, { useState, useEffect } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
function RecipeCookingForm({ recipe}) {
    const [rate, setRate] = useState(1); 
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [id, setId] = useState(null);
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { dispatch } = useRecipeContext();
    const [emptyFields, setEmptyFields] = useState([]);
    let {cookings} = recipe;
    
    useEffect(() => {
        if (recipe) {
            cookings = recipe.cookings;
            setId(recipe._id);
            setIngredients(recipe.ingredients);
            setInstructions(recipe.instructions);
        }
    }, [recipe]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const recipe = { cookings : cookings.concat({ rate, ingredients, instructions })}

        const response = await fetch(`api/recipes/${id}`, { //options
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
            
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setSuccess(false)
        }
        if (response.ok) {
            setRate('')
            setIngredients('')
            setInstructions('')
            setError(null)
            dispatch({ type: 'UPDATE_RECIPE', payload: json })
            setSuccess(true)
        }
    }

    return (
        <form className="recipeForm" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">Cooked successfully!</div>}
            <h2>Add Cooking</h2>
            <label>Rate</label>
            <input 
                type="number" 
                value={rate} 
                onChange={e => e.target.value >= 0 && e.target.value <= 10 ? setRate(e.target.value) 
                                : e.target.value < 0 ? setRate(0) : setRate(10)}
                className={emptyFields.includes('rate') ? "error" : ""}
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
            <button> Cook it!</button>

           
        </form>
        /* Conditional Rendering
        && is a logical AND operator. 
        In JavaScript, if the value on the left side of && is truthy, the value on the right side is returned. 
        If the value on the left side is falsy, it is returned.
        */
    );
}
export default RecipeCookingForm;
