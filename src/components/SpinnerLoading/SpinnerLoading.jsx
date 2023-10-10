import React from 'react'
import { useSpring, animated } from 'react-spring';

import Styles from './SpinnerLoading.module.css'



export default function SpinnerLoading() {

    const Spinner = () => {
        const { x } = useSpring({
          from: { x: '-20%' },
          to: { x: '80%' },
          config: { duration: 3000 }, 
          loop: true,
        });
      
        return (
          <div >
              <div className={`${Styles.loadingCover} w-100`}>
                <animated.div
                  style={{
                    width: '40%',
                    transform: x.to((x) => `translateX(${x})`),
                  }}
                >
                  <i className="fa-solid fa-cart-shopping fa-5x text-main"></i>
                </animated.div>
              </div>
          </div>
        );
      };





    return <>
    <Spinner/>
    
    </>
}
