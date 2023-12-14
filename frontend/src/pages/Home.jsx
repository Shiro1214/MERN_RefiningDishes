import { useEffect, useState} from "react"
import RecipeDetails from "../components/RecipeDetails"
import RecipeForm  from "../components/RecipeForm"
import Pagination from '@mui/material/Pagination';

function Home() {
    const [recipes, setRecipes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('api/recipes')
            const data = await response.json() //parse JSON to object
            if (response.ok) {
                setRecipes(data)
            }
        }
        fetchRecipes()
    },[])
    const numPages = Math.ceil(recipes.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem)

    /*
    const nextPage = () => {
        setCurrentPage(prevPageNumber => prevPageNumber + 1 > numPages ? prevPageNumber : prevPageNumber + 1)
    }

    const prevPage = () => {
        setCurrentPage(prevPageNumber => prevPageNumber - 1 < 1 ? prevPageNumber : prevPageNumber - 1)
    }
    */

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
        <div className="home">
            <div className="home-items">
                <div  className="pagination">
                    <Pagination count={numPages} page = {currentPage} color="primary" onChange={handlePageChange}/>
                </div>
                {currentItems && currentItems.map(recipe => (
                    <RecipeDetails key={recipe._id} recipe={recipe}/>
                ))}
                <div className="pagination">
                    <Pagination count={numPages} page = {currentPage} color="primary" onChange={handlePageChange}/>
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