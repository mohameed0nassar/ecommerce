import React, { memo, useContext, useEffect, useState} from 'react'
// import Styles from './Login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";

function Login() {
    let[isLoading,setIsLoading]=useState(false)
    let [error, setError] = useState(null)
    let { setUserToken  ,setUserEmail,setUserName}=useContext(UserContext)
    let Navigate=useNavigate()
    const passRegExp=/^[A-Z][a-z0-9]{5,20}$/
    const validationSchema = Yup.object({
        email: Yup.string().email('email format is not valid example@yahoo.com').required('* Required'),
        password: Yup.string().matches(passRegExp, 'password is not valid "first letter must be capital"').required('* Required'),
    })
    
    async function loginSubmit(values) {
        setIsLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        .catch((err) => {
            setError(err.response.data.message);
            setIsLoading(false)
        })
        
        if (data.message === 'success') {
            Navigate('/')
            setIsLoading(false)
            setUserToken(data.token)
            setUserName(data.user.name)
            setUserEmail(data.user.email)
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.user.name)
            window.location.reload()
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
            onSubmit: loginSubmit,
            validationSchema
        }
    )
    
    function forgotPassword() {
        Swal.fire({
          title: "Your Email",
          html: `
              <input type="email" placeholder="Enter your email" id="email" name="email"  class="form-control"/>
              `,
          showCancelButton: true,
          confirmButtonText: "Add",
          showLoaderOnConfirm: true,
          preConfirm: () => {
              const email = document.getElementById("email")?.value;
              localStorage.setItem('changePass',email)
            return { email };
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if(result.value){
            sendData({
              email: result?.value.email,
             
            });
          }
         
        });
      }
    async function sendData(email) {
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', 
        email
        )
        if (data.statusMsg === 'success') {
            Swal.fire({
                title: data.message,
                html: `
                    <input type="tel" placeholder="Enter the code you have received" id="resetCode" name="resetCode"  class="form-control"/>
                    `,
                showCancelButton: true,
                confirmButtonText: "Add",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    const resetCode = document.getElementById("resetCode")?.value;
                  return { resetCode };
                },
                allowOutsideClick: () => !Swal.isLoading(),
              }).then((result) => {
                if(result.value){
                  sendCode({
                    resetCode: result?.value.resetCode,
                   
                  });
                }
               
              });
       }
        
    }
    async function sendCode(resetCode) {
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', 
        resetCode
        )
       if (data.status==='Success') {
        Swal.fire({
            title: 'enter new password',
            html: `
            <span >must start with Capital letter and more than 6 letter</span> <br/>
                <input type="tel" placeholder="Enter new password" id="newPassword" name="newPassword"  class="form-control mb-2"/>
                `,
            showCancelButton: true,
            confirmButtonText: "Add",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const newPassword = document.getElementById("newPassword")?.value;
              return { newPassword };
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if(result.value){
              resetPassword({
                newPassword: result?.value.newPassword,
               email:localStorage.getItem('changePass')
              });
            }
           
          });
       }
    }
    async function resetPassword({newPassword,email}) {
        let {data}= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        {newPassword,email}
        )
        if (data.token) {
            Navigate('/')
            setUserToken(data.token)
            setUserEmail(localStorage.getItem('changePass'))
            localStorage.setItem('token', data.token)
            localStorage.removeItem('changePass')
            window.location.reload()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your password Changed",
                showConfirmButton: false,
                timer: 1000,
              });
        } else {
            Swal.fire({
                position: "center",
                icon: data.statusMsg,
                title: data.message,
                showConfirmButton: false,
                timer: 1000,
              });
        }
    }   
    useEffect(() => { 
        if (localStorage.getItem('token')) {
            Navigate('/')
            
        }
    },[])
    return <>
        <Helmet>
                <title>Login</title>
        </Helmet>
        <div className="row justify-content-center my-5 py-3 ">
            <div className="col-md-9">
                <h3 >Login Now : </h3>
                {error? <div className='alert alert-danger py-1 text-muted trans'>{ error}</div>:''}
                <form onSubmit={handleSubmit} className='py-3'>
                    <label htmlFor="userEmail" className='my-2'>User Email</label>
                    <input id='userEmail' className='form-control' type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} name='email' />
                    {errors.email && touched.email? <div className='alert alert-danger  py-1 text-muted trans'>{ errors.email}</div>:null}
                
                    
                    <label htmlFor="userPassword" className='my-2'>User Password</label>
                    <input id='userPassword' className='form-control' type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} name='password' />
                    {errors.password && touched.password? <div className='alert alert-danger  py-1 text-muted trans'>{ errors.password}</div>:null}

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
                    : <div className='mt-5 d-flex justify-content-between align-items-center '>
                            <div className='d-flex flex-column justify-content-between '>
                                <span className='fa-xs text-main mt-3 cursor-pointer' onClick={() => { forgotPassword()}}>forgot password !</span>
                                <span className='fa-xs text-main mt-3 cursor-pointer' onClick={() => { Navigate('/Register') }}>Don't have email ?</span>
                            </div>
                           
                            <button type='submit' className='btn bg-main text-white' disabled={!(isValid && dirty)}>Login</button>
                        </div>
                    }
                    
                </form>
            </div>
        </div>
        
    </> 
}

export default memo(Login);