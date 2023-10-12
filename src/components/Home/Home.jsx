import React, { memo} from 'react'
import Styles from './Home.module.css'
import AllProducts from '../AllProducts/AllProducts';
import MainSlider from '../MainSlider/MainSlider';
import CateSlider from '../CateSlider/CateSlider';
import { Helmet } from 'react-helmet';


function Home() {

    
    
    
    
    return <>
        <Helmet>
                <title>Fresh Cart</title>
            </Helmet>
        <MainSlider/>
        <CateSlider/>
        <AllProducts/>
    </> 
}

export default memo(Home);