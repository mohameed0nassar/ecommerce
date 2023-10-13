import React, { memo, useContext, useEffect} from 'react'
import Styles from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import FreshCart from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';



function Navbar() {
    let {setUserToken ,userToken,setUserName}=useContext(UserContext)
    let {wishCount,getWishList,setWishCount,setWishItemId}=useContext(wishListContext)
    let navigate=useNavigate()
    let { cartCount, setCartCount, getCartProducts } = useContext(CartContext)
    
    function goToWishList() {
        navigate('/wishlist')
    }
    function goToCart() {
        navigate('/cart')
    }
    function logout() {
        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        setUserToken(null)
        setUserName(null)
    }
    
    async function counterCart() {
        
        let { data } = await getCartProducts()
        setCartCount(data?.numOfCartItems)
        if (data===undefined) {
            setCartCount(0)
            
        }
      
    
    }
    async function counterWish() {
    
        let { data } = await getWishList()
            setWishCount(data?.count)
        setWishItemId(data?.data.map(item => item._id))
    }
    
    let navItems = document.querySelectorAll('.nav-item')
    for (const navItem of navItems) {
        navItem.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
        })
    }
    useEffect(() => { 
        counterCart()
        counterWish()
    },[])
    return <>

       <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top z-down shadow-sm ">
          <div className="container">
            <Link to=''><img src={FreshCart} className='w-100' alt="" /></Link>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                {userToken?<ul className="navbar-nav ms-2 mt-2 mt-lg-0">
              
           
                        <li className="nav-item">
                    <NavLink to=''>{({ isActive }) => (
                        <span className={`nav-link ${isActive?'text-main fw-bold ':''}`} >Home</span>
                    )}</NavLink>
              </li>
             
                        <li className="nav-item">
                    <NavLink to='products'>{({ isActive }) => (
                        <span className={`nav-link ${isActive?'text-main fw-bold ':''}`} >Products</span>
                    )}</NavLink>
                        </li>
                        
                            <li className="nav-item">
                        <NavLink to='cate'>{({ isActive }) => (
                            <span className={`nav-link ${isActive?'text-main fw-bold ':''}`} >Categories</span>
                        )}</NavLink>
                  </li>
             
                        <li className="nav-item">
                    <NavLink to='brands'>{({ isActive }) => (
                        <span className={`nav-link ${isActive?'text-main fw-bold ':''}`} >Brands</span>
                    )}</NavLink>
              </li>
              <li className="nav-item">
                    <NavLink to='cart'>{({ isActive }) => (
                        <span className={`nav-link ${isActive?'text-main fw-bold ':''}`} >Cart</span>
                    )}</NavLink>
              </li>
                        <li className="nav-item">
                    <NavLink to='wishlist'>{({ isActive }) => (
                        <span className={`nav-link ${isActive?'text-main fw-bold ':''}`} >Wishlist</span>
                    )}</NavLink>
              </li>

          </ul>:null}
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className="nav-item d-flex align-items-center mb-lg-0  mb-2">
                       <i className='me-3 fa-brands fa-instagram'></i>
                       <i className='me-3 fa-brands fa-facebook'></i>
                       <i className='me-3 fa-brands fa-tiktok'></i>
                       <i className='me-3 fa-brands fa-twitter'></i>
                       <i className='me-3 fa-brands fa-linkedin'></i>
                       <i className='me-3 fa-brands fa-youtube'></i>
                        </li>
                        {userToken ?
                    <li className='nav-item d-flex align-items-center align-self-end mb-2 mb-lg-0 '>
                    <i onClick={() => goToWishList()} className='fas fa-heart text-main cursor-pointer position-relative fs-4'>
                            
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-black fs-pg p-1">
                                {wishCount}
                            </span>
                    </i>
                    <i onClick={()=>goToCart()} className='fas fa-shopping-cart mx-3 position-relative text-main cursor-pointer fs-4'>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-black fs-pg p-1">
                            {cartCount}
                            </span>
                    </i>
                        <span className='cursor-pointer text-main fw-bold' onClick={()=>logout()}>Logout</span>
                            </li>
                            : <>
                            <li className="nav-item">
                            <Link className="nav-link" to='register'>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='login'>Login</Link>
                        </li>
                            </>            
                    }
                        
                        
                   </ul>
             
            </div>
         </div>
       </nav>
       
    </> 
}

export default memo(Navbar);