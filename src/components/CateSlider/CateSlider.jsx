import React, { memo, useContext, useEffect, useState} from 'react'
import Styles from './CateSlider.module.css'
import { Carousel } from 'react-responsive-carousel';
import { CateContext } from '../../Context/CateContext';
import { useQuery } from 'react-query';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';



function CateSlider() {
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplayspeed:2000,
  
  };    
    let {getAllCategories }=useContext(CateContext)
    let{data}=useQuery('getCateSlider',getAllCategories)

    return <>

<div className="row">
          <>
            <h2 className='h4 my-4'>Shop Populer Categories </h2>
<div className={Styles.slider}>
    <Slider {...settings}>
      {data?.data.data.map(item => <div key={item._id} className='col-md-2 cursor-pointer'><img height={200} src={item.image} alt={item.name} className='w-100' /><h5 className='h6 text-center mt-2'>{item.name }</h5></div>)}
    </Slider>
</div>
            </>
            </div>
    </> 
}

export default memo(CateSlider);
