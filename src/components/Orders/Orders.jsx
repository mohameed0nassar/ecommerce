import React, { memo, useContext} from 'react'
import Styles from './Orders.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import { Helmet } from 'react-helmet';

function Orders() {

    let { userId } = useContext(UserContext)
    
    function getAllOrders() {
       if (userId) {
           return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
           
        } else {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('id')}`)
           
       }
}

    let {data ,isLoading}=useQuery('getAllOrder',getAllOrders)

    return <>
        <Helmet>
                <title>Orders</title>
        </Helmet>
        {isLoading ?
            <div className='my-5'>
                <SpinnerLoading/>
            </div>
        : <>
            <div className='row my-5  p-2 justify-content-center '>
        {data?.data?.map((item,i) => (
            <>
            <h2  key={item.id} className='h4 fw-bolder text-center text-main'>Order Number ( {i+1} )</h2>
                            
                            <div className="col-md-4 card border-main d-flex mb-4 pb-4">
                                <p className='text-center fw-bold text-main my-3'>Hi {item.user?.name.toUpperCase()}</p>
                                <table>
                                    <tr>
                                        <td> Bill N.:</td>
                                        <td>{item.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone :</td>
                                        <td>{item.shippingAddress?.phone}</td>
                                    </tr>
                                    <tr>
                                        <td> City : </td>
                                        <td>{item.shippingAddress?.city}</td>
                                    </tr>
                                    <tr>
                                        <td> Tax : </td>
                                        <td>{item.taxPrice}</td>
                                    </tr>
                                    <tr>
                                        <td> Shipping : </td>
                                        <td>{item.shippingPrice}</td>
                                    </tr>
                                    <tr className='align-self-end mb-3'>
                                        <td className='text-main'>  Total Price : </td>
                                        <td className='fw-bolder text-main'>{item.totalOrderPrice} EGP</td>
                                    </tr>
                                </table>
                            </div>
                            <hr />
            
            </>
        ))}
        </div>
            
            
            
            </>
        
        
        
        }

        



        
    </> 
}

export default memo(Orders);