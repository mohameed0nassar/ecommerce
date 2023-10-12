import React, { memo, useContext, useEffect, useState} from 'react'
import { CartContext } from '../../Context/CartContext';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import { RotatingSquare, ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { wishListContext } from '../../Context/WishListContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

function Cart() {
    let { getCartProducts, updateQtyInCart ,deleteProductItemInCart,setCartCount,deleteProductsInCart} = useContext(CartContext)
    let {setUserId,setUserCartId} = useContext(UserContext)
    let [cartProducts,setCartProducts]= useState([])
    let [isPageLoading,setIsPageLoading]= useState(false)
    let [deleteLoading,setDeleteLoading]= useState(false)
    let [updateLoading,setUpdateLoading]=useState(false)
    let { addToWishList,setWishCount,setWishItemId,wishItemId,removeFromWishList} = useContext(wishListContext)
    let home =useNavigate()
    let paymentNav =useNavigate()
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
  async function update(id, count) {
      setUpdateLoading(true)
      let {data} = await updateQtyInCart(id, count)
      setCartProducts(data.data)
      setUpdateLoading(false)
  }
  async function remove(id) {
      setDeleteLoading(true)
      let { data } = await deleteProductItemInCart(id)
      setCartProducts(data.data)
  setCartCount(data?.numOfCartItems)

      setDeleteLoading(false)
  }
  async function removeCart(id) {
      setIsPageLoading(true)
    let { data } = await deleteProductsInCart()
    if (data.message=='success') {
      setCartProducts([])
      setCartCount(0)
      setIsPageLoading(false)
      display()
    }

      setIsPageLoading(false)
  }
  async function display() {
      setIsPageLoading(true)
    let { data } = await getCartProducts()
    setUserId(data?.data.cartOwner)
    setUserCartId(data?.data._id)
    setCartProducts(data?.data)
    setCartCount(data?.numOfCartItems)
    setIsPageLoading(false)
    if (data !=undefined) {
      localStorage.setItem('id',data?.data.cartOwner)
      
    }
      if (data==undefined) {
        setCartCount(0)
        
      }
}

useEffect(() => {
    display()
}, [])
  
  
    return <>
<Helmet>
      <title>Cart</title>
</Helmet>
<div className="row bg-light my-5 p-4">
      
  <h2>Shop Cart</h2>
  {isPageLoading ?
    <div className='my-5'>
            <SpinnerLoading />
    </div>
  : <>
    <span className='z-up'><Toaster /></span>
                    
    {cartProducts != null ? <>
      <div className='d-flex justify-content-md-between flex-md-row flex-column  align-items-center '>
        <h3 className='h6 text-main mb-3'>Total Cart Products Price : {cartProducts.totalCartPrice} EGP </h3>
        <div>
          <button className='btn text-main border-main' onClick={()=>{paymentNav('/payment')}}>Checkout</button>
        </div>
      </div>
      {cartProducts.products?.map(item => (
        <div key={item._id} className="row align-items-center ">
          <div className="col-md-2 p-3">
            <img src={item.product.imageCover} className='w-100' alt={item.product.title} />
          </div>

          <div className="col-md-10 p-4 d-flex justify-content-between align-items-center ">
            <div className='w-75'>
              <h5 className='h6 d-flex justify-content-between '>{item.product.title} </h5>
              <p className='text-main '>Price : {item.price} EGP</p>
              {deleteLoading ?
                  <ThreeDots 
                    height="76" 
                    width="80" 
                    radius="9"
                    color="#4fa94d" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={''}
                    wrapperClassName=""
                    visible={true}
                />
              : <p onClick={() => remove(item.product._id)} className='cursor-pointer mt-5'><i className='fas fa-trash text-main'></i> Remove</p>}
              {wishItemId?.filter(itemId => itemId === item.product._id).length ?
                <i onClick={() => removeProductFromWishlist(item.product._id)} className='fas fa-heart text-main cursor-pointer fs-5 '></i>
                :
                <i onClick={() => addProductInWishlist(item.product._id)} className='far fa-heart text-main cursor-pointer fs-5'></i>
              }
              
            </div>
          
            <div className='d-flex align-items-center'>
              {updateLoading ?
                <i className='d-inline'>
                  <RotatingSquare
                    height="50"
                    width="50"
                    color="#4fa94d"
                    ariaLabel="rotating-square-loading"
                    strokeWidth="4"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </i>
                : <i onClick={() =>update(item.product.id,item.count+1)} className='fas fa-plus p-2 border-main rounded-2 cursor-pointer'></i>}
              
                <span className='mx-2'>{item.count}</span>
              {updateLoading ?
                <i className='d-inline'>
                  <RotatingSquare
                    height="50"
                    width="50"
                    color="#4fa94d"
                    ariaLabel="rotating-square-loading"
                    strokeWidth="4"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </i>
                : <i onClick={() => update(item.product.id,item.count-1)} className='fas fa-minus p-2 border-main rounded-2 cursor-pointer'></i>}
              
            
            </div>
          </div>
          
          <p className='text-main text-end '>Total Price items : {item.price * item.count} EGP</p>
          <hr className='text-muted' />
        </div>
            ))
          }
            </> : <h4 className='mt-3 ps-2'>your Cart Empty <span className='text-main cursor-pointer' onClick={()=>{home('/')}}>go to shopping</span></h4>}</>}
        <div className='mt-4 text-center' ><button onClick={()=>{removeCart()}} className='btn text-main border-main'>Remove Cart</button></div>
</div>
    
    </> 
}

export default memo(Cart);