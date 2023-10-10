import axios from "axios";
import { createContext, useState } from "react";

export let wishListContext = createContext()
export default function WishListContextProvider({children}) {
    const headers ={
        token:localStorage.getItem('token')
    }
    let[wishCount,setWishCount]=useState(0)
    let[wishItemId,setWishItemId]=useState([])
    
    async function addToWishList(productId) {
        
    return await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers })
    .then(res => res)
        .catch(err => err)
   
   
}
async function removeFromWishList(productId) {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
    .then(res => res)
        .catch(err => err)
   
   
}
async function getWishList() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',  { headers })
    .then(res => res)
        .catch(err => err)
   
   
}

    return <wishListContext.Provider value={{ addToWishList ,getWishList,removeFromWishList,setWishCount,setWishItemId,wishCount,wishItemId}}>
        {children}
    </wishListContext.Provider>
}