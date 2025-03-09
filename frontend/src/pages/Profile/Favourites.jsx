import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";



const Favourites=()=>{

    const[FavouriteBooks,setFavoriteBooks]=useState();


    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

    useEffect(()=>{

        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/get-favourite-books", { headers });
                console.log("Response:", response.data);
                setFavoriteBooks(response.data.data);
            } catch (error) {
                console.error("Error fetching favourites:", error.response ? error.response.data : error.message);
            }
        };
        fetch();
    },[FavouriteBooks])

    return (
        <>  
            {FavouriteBooks && FavouriteBooks.map((items, i) => (
                <BookCard key={i} data={items} favourite={true} />  
            ))}
        </>
    );
    
    

}

export default Favourites;