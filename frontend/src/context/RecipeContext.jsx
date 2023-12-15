import { createContext, useReducer } from "react";

export const RecipeContext = createContext();

//Reducer updates state
export const recipeReducer = (state, action) => {
    switch (action.type) {
        //changing object inside state: {recipes:null}
        case "SET_RECIPES":
            return { recipes: action.payload };
        case "CREATE_RECIPE":
            return { recipes: [action.payload, ...state.recipes] };
        case "DELETE_RECIPE":
            return {
                recipes: state.recipes.filter(
                    (recipe) => recipe._id !== action.payload
                ),
            }
        case "UPDATE_RECIPE":
            return {
                recipes: state.recipes.map((recipe) =>
                    recipe._id === action.payload._id ? action.payload : recipe
                ),
            }
        default:
            return state;
    }
}

//provider setup state and dispatch and shared value
export const RecipeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recipeReducer, { recipes: null });
    return (
        <RecipeContext.Provider value={{...state, dispatch}}>
            {children}
        </RecipeContext.Provider>
    )
}