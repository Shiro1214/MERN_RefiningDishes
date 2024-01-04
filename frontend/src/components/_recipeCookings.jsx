import React, { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import RecipeForm from './RecipeForm';

function recipeCooking({cooking}){
    
    return(
        <div className='cooking'>
            <div className='cooking-date'>
                <p>{new Date(cooking.createdAt).toLocaleDateString()} {new Date(cooking.createdAt).toLocaleTimeString()}</p>
            </div>
            <div className='cooking-info'>
                <p>Rate: {cooking.rate}</p>
                <p>Instructions: {cooking.instructions}</p>
                <p>Ingredients: {cooking.ingredients}</p>
            </div>
        </div>
    );
}

export default recipeCooking;