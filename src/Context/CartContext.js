import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from "react";





export let CartContext = createContext()

export default function CartContextProvider({children}) {
    const headers ={
        token:localStorage.getItem('token')
    }
    let[cartCount,setCartCount]=useState(0)
function getCartProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',  {
        headers 
    }).then(res => res)
    .catch(err => err)
}
function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId
        }, {
            headers 
        }).then(res => res)
        .catch(err => err)
}
function updateQtyInCart(productId,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
        }, {
            headers 
        }).then(res => res)
        .catch(err => err)
}
function deleteProductItemInCart(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,  {
        headers 
    })
    .then(res => res)
    .catch(err => err)
}
function deleteProductsInCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,  {
        headers 
    })
    .then(res => res)
    .catch(err => err)
}
function payment(cartId,shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://mohameed0nassar.github.io/ecommerce${'/#'}`, {
            shippingAddress
        }, {
            headers 
        }).then(res => res)
        .catch(err => err)
}




    return <>
        <CartContext.Provider value={{ getCartProducts ,addToCart,updateQtyInCart,deleteProductItemInCart,cartCount,setCartCount,deleteProductsInCart,payment}}>
            {children}
    </CartContext.Provider>
    
    </>
}
