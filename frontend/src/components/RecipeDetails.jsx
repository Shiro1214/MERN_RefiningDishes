import React, { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import RecipeForm from './RecipeForm';

const RecipeTemplate = ({ recipe }) => {
  const {dispatch} = useRecipeContext();
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  }
  const handleDelete = async () => {
    const response = await fetch(`api/recipes/${recipe._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: recipe._id });
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <div className='buttonOptions'>
              <button className='material-symbols-outlined'onClick={handleDelete}>Delete</button>
              <button className='material-symbols-outlined edit'onClick={handleEdit}>Edit</button>
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
      {isEditing && (
        <div className="edit-form">
          <div className="edit-form-content">
            <button className='material-symbols-outlined cancel' onClick={() => setIsEditing(false)}>Cancel</button>
            <RecipeForm type='edit' recipe={recipe} />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeTemplate;

