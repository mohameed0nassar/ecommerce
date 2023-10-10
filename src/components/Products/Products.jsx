import React, { memo,useContext, useState} from 'react'
import Styles from './Products.module.css'

import axios from 'axios';
import {useQuery } from 'react-query';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { wishListContext } from '../../Context/WishListContext';



function Products() {
    let { addToCart, setCartCount } = useContext(CartContext)
    let { addToWishList, setWishCount, setWishItemId, wishItemId, removeFromWishList } = useContext(wishListContext)
    let[searchValue,setSearchValue]=useState('')
    let[products,setProducts]=useState([])
    async function addProductInWishlist(id) {
      let { data } = await addToWishList(id)
    
      if (data?.status === "success") {
          toast(`${data.message}`, {
              icon: '❤',
            className: 'text-main'
              
          })
        setWishCount(data?.data.length )
          setWishItemId(data?.data)
      }
  }
  async function removeProductFromWishlist(id) {
    let { data } = await removeFromWishList(id)
    if (data?.status === "success") {
       
        toast(`${data.message}`, {
            icon: '💔',
            className:'text-main'
        })
        setWishCount(data?.data.length)
        setWishItemId(data?.data)
    }
  }
      async function cartAdding(id) {
           
          let { data } = await addToCart(id)
          
          if (data.status==="success") {
              toast('your product added to cart', {
                  icon:'👌'
              })
              setCartCount(data.numOfCartItems)
          }
      }
  
  function getAllProducts() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }    
    let { data, isLoading } = useQuery('getAllProducts', getAllProducts)

   
    function nameOfProduct(value) {
        setSearchValue(value)
        if (searchValue !== '') {
            let titles = data?.data.data.map(item => item.title)
            let newArr=[]
            for (let i = 0; i < titles.length; i++) {
                if (titles[i].toLowerCase().includes(searchValue.toLowerCase())) {
                    newArr.push(data?.data.data[i])
                }
            }
            setProducts(newArr)
        }
    }
    return <>

        <div className="row my-5">
        <span className='z-up'><Toaster /></span>
            <div className='w-100 mb-5 '>
                    <input type="text" className='form-control w-75 mx-auto ' placeholder='Search...' onInput={(e)=>{nameOfProduct(e.target.value)}} />
            </div>
                {isLoading ?
                    <div className='mb-5' >
                        <SpinnerLoading />
                    </div>
                :products!=''?products.map((item)=> (
                    <div key={item.id} className="col-md-2">
                        <div className='product p-2 position-relative '>
                        {wishItemId?.filter(itemId=>itemId===item.id).length?<i onClick={()=>removeProductFromWishlist(item.id)} className='fas fa-heart text-main cursor-pointer fs-5 '></i>:<i onClick={()=>addProductInWishlist(item.id)} className='far fa-heart text-main cursor-pointer fs-5'></i>}
                        
                        
                            <Link to={`/product/${item.id}`}>
                            <img src={item.imageCover} className='w-100' alt={item.title} />
                                <h3 className='h6 text-main mt-2'>{ item.category.name}</h3>
                                <h2 className='h6'>{ item.title.split(" ").slice(0,3).join(" ")}</h2>
                            <div className='d-flex justify-content-between mb-2 align-items-center '>
                                    <span>{ item.price} EGP</span>
                                    <span><i className='fas fa-star rating-color'></i>{ item.ratingsAverage}</span>
                                </div>
                    </Link>
                                <button onClick={()=>cartAdding(item.id)} className='btn bg-main text-white text-center w-100'>Add To Cart</button>
                                
                        </div>
                </div>
                )):data?.data.data.map((item)=> (
                    <div key={item.id} className="col-md-2">
                        <div className='product p-2 position-relative '>
                        {wishItemId.filter(itemId=>itemId===item.id).length?<i onClick={()=>removeProductFromWishlist(item.id)} className='fas fa-heart text-main cursor-pointer fs-5 '></i>:<i onClick={()=>addProductInWishlist(item.id)} className='far fa-heart text-main cursor-pointer fs-5'></i>}
                        
                        
                            <Link to={`/product/${item.id}`}>
                            <img src={item.imageCover} className='w-100' alt={item.title} />
                                <h3 className='h6 text-main mt-2'>{ item.category.name}</h3>
                                <h2 className='h6'>{ item.title.split(" ").slice(0,3).join(" ")}</h2>
                            <div className='d-flex justify-content-between mb-2 align-items-center '>
                                    <span>{ item.price} EGP</span>
                                    <span><i className='fas fa-star rating-color'></i>{ item.ratingsAverage}</span>
                                </div>
                    </Link>
                                <button onClick={()=>cartAdding(item.id)} className='btn bg-main text-white text-center w-100'>Add To Cart</button>
                                
                        </div>
                </div>
                ))}
            </div>
    </> 
}

export default memo(Products);





