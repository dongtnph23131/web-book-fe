import { createContext, useContext, useEffect, useState } from "react";

const AppContext=createContext()

const AppProvider=({children})=>{
    const [userLogger,setUserLogger]=useState(JSON.parse(localStorage.getItem('user')))
    const [token,setToken]=useState(JSON.parse(localStorage.getItem('token')))
    useEffect(()=>{
       setUserLogger(JSON.parse(localStorage.getItem('user')))
       setToken(JSON.parse(localStorage.getItem('token')))
    },[])
    return <AppContext.Provider value={{userLogger,setUserLogger,token,setToken}}>
        {children}
    </AppContext.Provider>
}
export const AppState=()=>{
    return useContext(AppContext)
}
export default AppProvider