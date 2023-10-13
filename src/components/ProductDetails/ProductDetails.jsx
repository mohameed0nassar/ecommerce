import React, { memo, useContext} from 'react'
import Styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import { Carousel } from 'react-responsive-carousel';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';


function ProductDetails() {
    let { addToCart, setCartCount } = useContext(CartContext)
    let { addToWishList, setWishCount, setWishItemId, wishItemId, removeFromWishList } = useContext(wishListContext)
     window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
    
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
    let {id} = useParams()
     function getProductsDetails(id) {
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { data, isLoading } = useQuery(['getProductDetails',id],()=>getProductsDetails(id))

    return <>
<Helmet>
                <title>{data?.data.data.title}</title>
            </Helmet>
{isLoading ? <div className='my-5'>
<SpinnerLoading />
                    </div>
            :<>
                <span className='z-up'><Toaster /></span>
                <h3 className='mt-5 text-main fw-bold '>Product Details</h3>
                {data? <div key={data?.data.data._id} className="row justify-content-center align-items-center my-5">
                <div className="col-md-4">
                    <div className='p-3 mb-2'>
                     
                            <Carousel 
                    autoPlay={30}
                    infiniteLoop={true}
                    showThumbs={true}
                    showStatus={false} showIndicators={false}
                            >
                                {data?.data.data.images?.map((img,index)=><img key={index} src={img} alt={data?.data.data.title} className='w-100' />)}
                </Carousel>
                    </div>
                </div>
                <div className="col-md-8">
                <h2 className='h5 d-flex  justify-content-between cursor-pointer'>{data?.data.data.title}
                {wishItemId?.filter(itemId=>itemId===data?.data.data._id).length?<i onClick={()=>removeProductFromWishlist(data?.data.data._id)} className='fas fa-heart text-main cursor-pointer fs-5 '></i>:<i onClick={()=>addProductInWishlist(data?.data.data._id)} className='far fa-heart text-main cursor-pointer fs-5'></i>}
                    
                            {/* {wish ? <i onClick={() => removeFromWL(productDetails._id)} className='fas fa-heart-crack text-main'></i> : <i onClick={() => addToWL(productDetails._id)} className='fas fa-heart text-main'></i>}*/}</h2> 
                    <p className='p-2 my-3 text-muted fs-p'>{data?.data.data.description}</p>
                    <p>{data?.data.data.category?.name}</p>
                    <div className='d-flex justify-content-between mb-2 align-items-center '>
                                    <span>{data?.data.data.price} EGP</span>
                                    <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
                    </div>
                    <button onClick={()=>cartAdding(data?.data.data._id)} className='btn bg-main text-white text-center w-100 my-2'>Add To Cart</button>
                    
                    </div>
            </div>:null}
            </>
            }
    </> 
}

export default memo(ProductDetails);