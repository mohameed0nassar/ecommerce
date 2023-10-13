import React, { memo, useContext, useEffect, useState} from 'react'
import Styles from './Wishlist.module.css'
import { wishListContext } from '../../Context/WishListContext';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

function Wishlist() {
    let {addToCart ,setCartCount}=useContext(CartContext)
    let { getWishList,setWishCount,setWishItemId ,removeFromWishList} = useContext(wishListContext)    
    let [wishProducts, setWishProducts] = useState([])
    let [isLoading, setIsLoading] = useState(false)
    let productDetails = useNavigate()
  function goToProductDetails(id) {
      
        productDetails(`/product/${id}`)
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
  async function removeProduct(id) {
    
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
  
        let { data } = await removeFromWishList(id)
        if (data?.status === "success") {
            
            toast(`${data.message}`, {
                icon: '💔',
                className:'text-main'
              })
          setWishCount(data?.data.length)
          setWishItemId(data?.data)
              getWishProducts()
        }
    }
    async function getWishProducts() {
        setIsLoading(true)
        let { data } = await getWishList()
        if (data?.status ==='success') {
            setWishProducts(data.data)
            setWishCount(data?.data.length)
            setWishItemId(data?.data.map(item=>item.id))
            setIsLoading(false)
        }
        
        setIsLoading(false)
    }
    
    
    useEffect(() => {
        getWishProducts()
     },[])
    
  return <>
      
      <Helmet>
                <title>Wishlist</title>
            </Helmet>
         <div className="row bg-light my-5 p-4">
      
      {isLoading ?
        <div className='my-5'>
         <SpinnerLoading />
        </div>
                : <>
                <span className='z-up'><Toaster /></span>
                    
                <h2>Wish List</h2>
          {
            wishProducts?.map(item => (
              <div key={item._id} className="row align-items-center ">
                <div className="col-md-2 p-3">
                  <Carousel 
                    showArrows={false}
                    autoPlay={30}
                    infiniteLoop={true}
                    showThumbs={true}
                    showStatus={false} showIndicators={false}
                            >
          {item.images?.map((img,index)=><img key={index} src={`https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/${img}`} alt={item.title} className='w-100' />)}
          </Carousel>
                </div>
                <div className="col-md-10 p-4 d-flex justify-content-between align-items-center ">
                  <div className='w-100'>
                    <h5 className='h6 d-flex  justify-content-between '>{item.title} <span onClick={()=>{goToProductDetails(item._id)}} className='text-main cursor-pointer space-nowrap'>Product Details</span></h5>
                    <p className='text-main d-flex justify-content-between '>Price : {item.price} EGP <i onClick={()=>{removeProduct(item._id)}} className='fas fa-heart text-main cursor-pointer'> remove</i></p>
                    
                 <button onClick={()=>{cartAdding(item._id)}} className='btn bg-main text-white w-100 mt-3'>Add To Cart</button>
                  </div>
                
                </div>
               
                <hr className='text-muted' />
              </div>
            ))
          }</>}
        
      </div>
    </> 
}

export default memo(Wishlist);