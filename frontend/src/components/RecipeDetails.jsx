import React from 'react';

const RecipeTemplate = ({ recipe }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">
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

