import React from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';

const RecipeTemplate = ({ recipe }) => {
  const {dispatch} = useRecipeContext();
  const handleDelete = async () => {
    const response = await fetch(`api/recipes/${recipe._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: recipe._id });
    }
  }
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">
          <div className='buttonOptions'>
            <button onClick={handleDelete}>Delete</button>
          </div>
          {recipe.name}
        </div>
        <div className="card-subtitle">
          Ingredients: {recipe.ingredients}
        </div>
        <div className="card-body">
          Instructions: {recipe.instructions}
        </div>
      </div>
    </div>
  );
};

export default RecipeTemplate;

