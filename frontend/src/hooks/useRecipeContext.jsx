import { RecipeContext } from "../context/RecipeContext";
import { useContext } from "react";

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    if (context === undefined) {
        throw new Error("useRecipeContext must be used within a RecipeContextProvider");
    }
    return context;
}