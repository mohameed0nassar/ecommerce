import React, { memo } from 'react'
import Styles from './MainSlider.module.css'
import SliderOne from '../../Assets/images/slider-image-1.jpeg'
import SliderTwo from '../../Assets/images/slider-image-2.jpeg'
import SliderThree from '../../Assets/images/slider-image-3.jpeg'
import BannerOne from '../../Assets/images/slider-2.jpeg'
import BannerTwo from '../../Assets/images/grocery-banner-2.jpeg'
import { Carousel } from 'react-responsive-carousel';


function MainSlider() {
   

    
    return <> 
            
        <div className="row my-3 g-0">
            <div className="col-md-8 ">
                <Carousel 
                    autoPlay={30}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false} showIndicators={false}
                >
     
        <div> <img src={SliderThree} height={350} className='w-100' alt="third products" /></div>
                                <div><img src={SliderOne} height={350} className='w-100' alt="first products" /></div>
                               <div> <img src={SliderTwo} height={350} className='w-100' alt="second products" /></div>
    </Carousel>
            </div>
        <div className="col-md-4">
                <div className='row g-0'>

                    <img src={BannerOne} height={175} className='col-6 col-md-12 ' alt="" />
                    <img src={BannerTwo} height={175} className='col-6 col-md-12' alt="" />
                </div>
        </div>
    </div>
            
    </>
};
export default memo(MainSlider);