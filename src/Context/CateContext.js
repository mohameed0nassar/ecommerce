import axios from 'axios';
import React, { createContext} from 'react'



export let CateContext = createContext();

export default function CateContextProvider({ children }) {
    

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    function getAllSubCategories() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/subcategories')
    }
 
  return (
      <CateContext.Provider value={{ getAllCategories ,getAllSubCategories}}>
          {children}
    </CateContext.Provider>
  )
}
