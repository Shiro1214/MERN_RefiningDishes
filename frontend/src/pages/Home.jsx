import { useEffect, useState} from "react"
import RecipeDetails from "../components/RecipeDetails"
import RecipeForm  from "../components/RecipeForm"
import Pagination from '@mui/material/Pagination';
import { useRecipeContext } from "../hooks/useRecipeContext";

function Home() {
    
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
    const { recipes, dispatch } = useRecipeContext()
    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('api/recipes')
            const data = await response.json() //parse JSON to object
            if (response.ok) {
                dispatch({type: 'SET_RECIPES', payload: data})
            }
        }
        fetchRecipes()
    },[])
    
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = recipes ? recipes.slice(indexOfFirstItem, indexOfLastItem) : null

    return (
        <>
        <div className="home">
            <div className="home-items">
                {currentItems && currentItems.map(recipe => (
                    <RecipeDetails key={recipe._id} recipe={recipe}/>
                ))}
                <div className="pagination">
                    <Pagination 
                        count={recipes ? Math.ceil(recipes.length / itemsPerPage) : 0} 
                        page = {currentPage} 
                        color="primary" 
                        onChange={handlePageChange}
                    />
                </div>
            </div>
            <div className="home-items">
                <RecipeForm />
            </div>
            
        </div>

        </>
    )
}

export default Home