import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
// import SpinnerLoading from './components/SpinnerLoading/SpinnerLoading';
import Layout from './Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import Products from './components/Products/Products'
import UserContextProvider from './Context/UserContext';
import Gurd from './components/Gurd/Gurd';
import Pay from './components/Pay/Pay';
import Orders from './components/Orders/Orders';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CateContextProvider from './Context/CateContext';
import CartContextProvider from './Context/CartContext';
import WishListContextProvider from './Context/WishListContext';


const router = createHashRouter([
  {
    path: '', element: <Layout />, children: [
      {index:true,element:<Gurd><Home/></Gurd>},
      {path:'cate',element:<Gurd><Categories/></Gurd>,},
      {path:'brands',element:<Gurd><Brands/></Gurd>},
      {path:'products',element:<Gurd><Products/></Gurd>},
      {path:'payment',element:<Gurd><Pay/></Gurd>},
      {path:'allorders',element:<Gurd><Orders/></Gurd>},
      {path:'products',element:<Gurd><Products/></Gurd>},
      {path:'product/:id',element:<Gurd><ProductDetails/></Gurd>},
      {path:'register',element:<Register/>},
      {path:'login',element:<Login/>},
      {path:'cart',element:<Gurd><Cart/></Gurd>},
      {path:'wishlist',element:<Gurd><Wishlist/></Gurd>},
      {path:'*',element:<Notfound/>}
    ]}
])
function App() {

  
  return <>
    <UserContextProvider>
      <CateContextProvider>
        <CartContextProvider>
          <WishListContextProvider>  
            <RouterProvider router={router}/>
          </WishListContextProvider>
        </CartContextProvider>
      </CateContextProvider>
    </UserContextProvider>
    
    
  
  </>
}

export default App;
