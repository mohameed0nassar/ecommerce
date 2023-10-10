import React, { memo, useContext, useState} from 'react'
import Styles from './Pay.module.css'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { useFormik } from 'formik';
import { Bars } from 'react-loader-spinner';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';
function Pay() {
    const phoneRegExp = /^01[0125][0-9]{8}$/
    const cityRegExp = /^[a-zA-Z\s]+$/

    const validationSchema = Yup.object({
       
        details: Yup.string('Must be String').min(10, 'The address must be true').required('* Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('* Required'),
        city: Yup.string().matches(cityRegExp, 'City is not valid').required('* Required'),
        
       
    })
    let {userCartId} = useContext(UserContext)
    let { payment } = useContext(CartContext)
    let [isLoading,setIsLoading]=useState(false)
    async function payOnline(values) {
        setIsLoading(true)
        let  {data}  = await payment(userCartId, values)
        if (data?.status==='success') {
            window.location.href = data.session.url;
            setIsLoading(false)
        }
        setIsLoading(false)
    }
    let {handleBlur,handleSubmit,handleChange,dirty,isValid,values,errors,touched} = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city:''
        },
        onSubmit: payOnline,
        validationSchema
    })
    
    
    return <>
        <Helmet>
            <title>Pay Online</title>
        </Helmet>

        <form className='my-5' onSubmit={handleSubmit}>
            <label htmlFor="orderDetails">Address Details :</label>
            <input type="text" className='form-control my-2' id='orderDetails' name='details' value={values.details} onChange={handleChange} onBlur={handleBlur} />
            {errors.details && touched.details ? <div className='alert alert-danger  py-1 text-muted trans'>{errors.details}</div> : null}
            
            <label htmlFor="orderPhone">Phone :</label>
            <input type="tel" className='form-control my-2' id='orderPhone' name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} />
            {errors.phone && touched.phone ? <div className='alert alert-danger  py-1 text-muted trans'>{errors.phone}</div> : null}
            
            <label htmlFor="orderCity">City :</label>
            <input type="text" className='form-control my-2' id='orderCity' name='city' value={values.city} onChange={handleChange} onBlur={handleBlur} />
            {errors.city && touched.city ? <div className='alert alert-danger  py-1 text-muted trans'>{errors.city}</div> : null}

            
        {isLoading? <div className='mt-5 d-flex w-100 justify-content-start  '>
                        
                        <Bars
                        height="60"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                        
                     </div>:<button type='submit' disabled={!(isValid && dirty)} className='btn bg-main mt-3 text-white '>Pay Now</button>}
        </form>
        
    </> 
}

export default memo(Pay);