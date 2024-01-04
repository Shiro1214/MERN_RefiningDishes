import React, { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import RecipeForm from './RecipeForm';
import Cooking from './_recipeCookings';
import RecipeCookingForm from './RecipeCookingForm';
import Pagination from '@mui/material/Pagination';

const RecipeTemplate = ({ recipe }) => {
  const {dispatch} = useRecipeContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isCooking, setIsCooking] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
};
  const handleEdit = () => {
    setIsEditing(true);
  }
  const handleCook = () => {
    setIsCooking(true);
  }
  const handleDelete = async () => {
    const response = await fetch(`api/recipes/${recipe._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: recipe._id });
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = recipe.cookings ? recipe.cookings.slice(indexOfFirstItem, indexOfLastItem) : null

  return (
    <>
      <div className="card" >
        <div className="card-content">
          <div className="card-title" >
            <div className='buttonOptions'>
              <button className='material-symbols-outlined'onClick={handleDelete}>Delete</button>
              <button className='material-symbols-outlined edit'onClick={handleEdit}>Edit</button>
            </div>
            <div onClick={handleCook}>
            {recipe.name}
            </div>
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
      {isCooking && (
        <div className="recipeCookingsContainer">
          <div className="recipeCookings">
            <div className='recipeCookingsContent'>
                {currentItems.map(cooking => (
                  <Cooking key={cooking._id} cooking={cooking} />
                ))}
                <div className="pagination">
                  <Pagination 
                        count={recipe.cookings ? Math.ceil(recipe.cookings.length / itemsPerPage) : 0} 
                        page = {currentPage} 
                        color="primary" 
                        onChange={handlePageChange}
                  />
                </div>
            </div>
            <div className='recipeCookingsContent'>
              <button className='material-symbols-outlined cancel' onClick={() => setIsCooking(false)}>Cancel</button>
              <RecipeCookingForm  recipe={recipe} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeTemplate;

