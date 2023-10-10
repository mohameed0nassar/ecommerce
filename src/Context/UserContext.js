import React, { createContext, useState } from 'react'


export let UserContext = createContext();


export default function UserContextProvider({children}) {
  
    let [userToken,setUserToken]=useState(null)
    let [userId,setUserId]=useState(null)
    let [userCartId,setUserCartId]=useState(null)
    let [userName,setUserName]=useState(null)
    let [userEmail,setUserEmail]=useState(null)
 
    return <>
        <UserContext.Provider  value={{ userToken,setUserToken,setUserName ,setUserEmail,userName ,userEmail,userId,setUserId,userCartId,setUserCartId}}>
            {children}
    </UserContext.Provider>
    </>
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGI0NWE4NDVlZDRiMjQ4YzEyMjI2ZiIsIm5hbWUiOiJtb2hhbWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTY0NTczNTEsImV4cCI6MTcwNDIzMzM1MX0.5EQ6UDX6XtmtZZlm5qn9JDAesQq_POORO5JTLeOvLj4