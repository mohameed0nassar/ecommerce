import React, { memo } from 'react'
import styles from './Gurd.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

function Gurd({children}) {
    let orders =useNavigate()
    if (window.location.href==='https://mohameed0nassar.github.io/ecommerce/allorders'
    ) {
        orders('/allorders')
    }
    if (localStorage.getItem('token')!==null) {
        return children
    } else {
        return <Navigate to={'/login'}/>
    }
    
    
    
};
export default memo(Gurd);