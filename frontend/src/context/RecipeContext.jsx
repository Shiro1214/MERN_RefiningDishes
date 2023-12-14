import { createContext, useReducer } from "react";

export const RecipeContext = createContext();

export const recipeReducer = (state, action) => {
    switch (action.type) {
        case "SET_RECIPES":
            return { recipes: action.payload };
        case "CREATE_RECIPE":
            return { recipes: [action.payload, ...state.recipes] };
        default:
            return state;
    }
}

export const RecipeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recipeReducer, { recipes: null });
    return (
        <RecipeContext.Provider value={{...state, dispatch}}>
            {children}
        </RecipeContext.Provider>
    )
}