import React, { memo, useContext, useRef, useState} from 'react'
import Styles from './Categories.module.css'
import { CateContext } from '../../Context/CateContext';
import { useQuery } from 'react-query';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import { Helmet } from 'react-helmet';

function Categories() {
    const ref =useRef()
    let[subCategory,setSubCategory]=useState([])
    let[nameSubCategory,setNameSubCategory]=useState('')
    let { getAllCategories,getAllSubCategories}=useContext(CateContext)
    let subCategories = useQuery('getSubCategories', getAllSubCategories)
    let { data, isLoading } = useQuery('getAllCategories', getAllCategories)
    
    function getSubCategories(id,name) {
        let cateId=subCategories.data.data.data.map((item)=>item.category)
        let sameCate =[]
        for (let i = 0; i < cateId.length; i++) {
            if (cateId[i]===id) {
                sameCate.push(subCategories.data.data.data[i].name)
            }
            
        }
        setSubCategory(sameCate)
        setNameSubCategory(name)
        ref.current?.scrollIntoView()
        
    }
    

    return <>
<Helmet>
                <title>Categories</title>
            </Helmet>
<div className="row my-5 g-3">
            {subCategories.isLoading ?
                <div className='my-5'>
                    <SpinnerLoading/>
                </div>
                : <>
                {isLoading?
                    <div className='d-flex justify-content-center align-items-center '>
                        <SpinnerLoading/>
                    </div>
                :data?.data.data.map((item)=> (
                    <div key={item._id} className="col-md-3">
                        <div onClick={()=>getSubCategories(item._id,item.name)}  className='cursor-pointer cate'>
                            <img height={300} src={item.image} className='w-100' alt={item.name} />
                            <h2 className='h6'>{item.name}</h2>
                        </div>
                    </div>
                ))}
                    {<h2 ref={ref} className='text-center text-main my-3'>{nameSubCategory? `${nameSubCategory} -- SubCategories`:''}</h2>}
                    {subCategory !== null ? subCategory.map((item,index) => (
                        <div key={index} className="col-md-4 col-lg-2 col-sm-6 ">
                            <span className='w-100 text-center card border-main cursor-pointer p-2'>{item}</span>
                        </div>
                    )):''}
                </>}
            </div>
    </> 
}

export default memo(Categories);