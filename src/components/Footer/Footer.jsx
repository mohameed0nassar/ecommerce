import React, { memo, useContext} from 'react'
import Styles from './Footer.module.css'
import { UserContext } from '../../Context/UserContext';
import appStore from '../../Assets/images/appStore.png'
import googlePlay from '../../Assets/images/googlePlay.png'

function Footer() {

    let {userName}=useContext(UserContext)
    
    
    
    return <>
<footer className='bg-light  py-3'>
    
            <div className="container  ">
                    <h6 className='h4'>{userName?<span >Welcome <span className='text-main fw-bold'>{userName.toUpperCase()}</span></span>:null} Get the FreshCart app</h6>
                    <p className='text-muted'>we will send you a link , open it on your phone to download the app</p>
                <div className='d-flex justify-content-md-between mt-3 flex-lg-row flex-column px-3 mb-5'>
                    <input type="text" className='form-control me-md-3 me-0 ' />
                    <button className='btn bg-main text-white my-2 m-md-0 '> Share App Link</button>
                </div>
                <hr className='m-0'/>
                <div className='d-flex justify-content-md-between mt-3 flex-lg-row flex-column   '>
                    <p className='d-flex align-items-center '>Payment Partners
                        <i className='fab fs-1 ms-2 fa-amazon-pay text-warning '></i>
                        <i className="fab fs-1 ms-2 fa-cc-amex text-info"></i>
                        <i className="fab fs-1 ms-2 fa-cc-mastercard text-danger"></i>
                        <i className="fab fs-1 ms-2 fa-cc-paypal text-bg-primary"></i>
                    </p>
                    <p>Get deliveries with FreshCart 
                        <img src={appStore} className='mx-1' alt="" />
                        <img src={googlePlay} alt="" />
                    </p>
                </div>
                <hr className='mb-5 mt-0'/>
            </div>
</footer>
    </> 
}

export default memo(Footer);