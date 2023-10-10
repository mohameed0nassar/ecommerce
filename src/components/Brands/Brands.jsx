import React, { memo} from 'react'
import Styles from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading'
import { Helmet } from 'react-helmet';

function Brands() {

    
    function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    
    let {  data ,isLoading} = useQuery('getAllBrands', getAllBrands)
    
    
    
    return <>
        <Helmet>
                <title>Brands</title>
        </Helmet>

    <div className="row  my-5 g-3">
        {isLoading?
            <div className='mt-5'>
                <SpinnerLoading/>
            </div>
        :data?.data.data.map((item)=> (
            <div key={item._id} className="col-md-3">
                <div   className='cursor-pointer cate'>
                    <img height={300} src={item.image} className='w-100' alt={item.name} />
                    <h2 className='h6 d-flex align-items-start text-dark'><span className='mt-3'>{item.name}</span></h2>
                </div>
            </div>
                ))}
    </div>
    </> 
}

export default memo(Brands);