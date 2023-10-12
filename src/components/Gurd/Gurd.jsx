import React, { memo } from 'react'
import styles from './Gurd.module.css'
import { Navigate } from 'react-router-dom';

function Gurd({children}) {
    
    if (window.location.href==='https://mohameed0nassar.github.io/ecommerce/allorders'
    ) {
        return window.location.href='https://mohameed0nassar.github.io/ecommerce/#/allorders'
    }
    if (localStorage.getItem('token')!==null) {
        return children
    } else {
        return <Navigate to={'/login'}/>
    }
    
    
    
};
export default memo(Gurd);