import React, { memo, useCallback, useEffect, useState} from 'react'
import Styles from './Register.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



function Register() {
    let[isLoading,setIsLoading]=useState(false)
    let[error,setError]=useState(null)

    const phoneRegExp = /^01[0125][0-9]{8}$/
    const passRegExp=/^[A-Z][a-z0-9]{5,20}$/

    const validationSchema = Yup.object({
        name: Yup.string('Must be String').min(3, 'The name must be more than 3 char').max(15, 'The name must be less than 15 char').required('* Required'),
        email: Yup.string().email('email format is not valid example@yahoo.com').required('* Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('* Required'),
        password: Yup.string().matches(passRegExp, 'password is not valid').required('* Required'),
        rePassword:Yup.string().oneOf([Yup.ref('password')],'password is not match').required('* Required')
    })

    
let Navigate=useNavigate()
    async function registerSubmit(values) {
        setIsLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .catch((err) => {
                setError(err.response.data.message);
        setIsLoading(false)
                
    })
        
        if (data.message === 'success') {
            Navigate('/login')
            setIsLoading(false)
            
        } 
    }
  
    
    
    const {values,handleBlur,handleSubmit,handleChange,errors,touched,isValid,dirty} = useFormik(
        {
            initialValues: {
                name:'' ,
                email:'',
                password:'',
                rePassword:'',
                phone:''
            },
            onSubmit: registerSubmit,
            validationSchema
        }
    )
    


    return <>
        <Helmet>
                <title>Register</title>
            </Helmet>
        <div className="row justify-content-center my-5 py-3 ">
            <div className="col-md-9">
                <h3 >Register Now : </h3>
                {error? <div className='alert alert-danger py-1 text-muted trans'>{ error}</div>:''}
                <form onSubmit={handleSubmit} className='py-3'>
                    <label htmlFor="userName" className='my-2'>User Name</label>
                    <input id='userName' className='form-control' type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} name='name' />
                    {errors.name && touched.name? <div className='alert alert-danger  py-1 text-muted trans'>{ errors.name}</div>:null}

                    <label htmlFor="userEmail" className='my-2'>User Email</label>
                    <input id='userEmail' className='form-control' type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} name='email' />
                    {errors.email && touched.email? <div className='alert alert-danger  py-1 text-muted trans'>{ errors.email}</div>:null}
                
                    
                    <label htmlFor="userPassword" className='my-2'>User Password</label>
                    <input id='userPassword' className='form-control' type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} name='password' />
                    {errors.password && touched.password? <div className='alert alert-danger  py-1 text-muted trans'>{ errors.password}</div>:null}

                    
                    <label htmlFor="rePassword" className='my-2'>rePassword</label>
                    <input id='rePassword' className='form-control' type="password" value={values.rePassword} onChange={handleChange} onBlur={handleBlur} name='rePassword' />
                    {errors.rePassword && touched.rePassword? <div className='alert alert-danger  py-1 text-muted trans'>{ errors.rePassword}</div>:null}

                    
                    <label htmlFor="userPhone" className='my-2'>User Phone</label>
                    <input id='userPhone' className='form-control' type="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur} name='phone' />
                    {errors.phone && touched.phone? <div className='alert alert-danger  py-1 text-muted trans'>{ errors.phone}</div>:null}

                    {isLoading ?
                    <div className='mt-5 d-flex w-100 justify-content-end  '>
                        
                        <Bars
                        height="60"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        />
                        
                    </div>

                        : <div className='mt-5 text-end '><button type='submit' className='btn bg-main text-white' disabled={!(isValid && dirty)}>Register</button></div>}
                    
                </form>
            </div>
        </div>
        
    </> 
}

export default memo(Register);