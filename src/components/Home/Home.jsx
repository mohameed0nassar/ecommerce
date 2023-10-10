import React, { memo} from 'react'
import Styles from './Home.module.css'
import AllProducts from '../AllProducts/AllProducts';
import MainSlider from '../MainSlider/MainSlider';
import CateSlider from '../CateSlider/CateSlider';



function Home() {

    
    
    
    
    return <>
        <MainSlider/>
        <CateSlider/>
        <AllProducts/>
    </> 
}

export default memo(Home);