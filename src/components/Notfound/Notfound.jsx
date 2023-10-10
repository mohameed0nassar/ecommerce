import React, { memo} from 'react'
import Styles from './Notfound.module.css'
import NotfoundImg from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet';
function Notfound() {

    
    
    
    
    return <>
<Helmet>
    <title>Notfound</title>
</Helmet>
        <div className="row my-5 justify-content-center ">
            <div className="col-10">
                <img src={NotfoundImg} className='w-100' alt="" />
            </div>
        </div>
    </> 
}

export default memo(Notfound);