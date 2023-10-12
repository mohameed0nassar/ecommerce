import React, { memo } from 'react'
import styles from './Gurd.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

function Gurd({ children }) {
    
    if (localStorage.getItem('token')!==null) {
        return children
    } else {
        return <Navigate to={'/login'}/>
    }
    
    
    
};
export default memo(Gurd);