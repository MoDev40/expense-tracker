'use client'
import { signOut, useSession } from "next-auth/react";
import React, {createContext, useContext, useEffect, useState} from "react"
interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

interface ContextType{
    user:User | null;
    logOut:()=>void;
}

const UserContext = createContext<ContextType>({} as ContextType)

export const UserProvider = ({children}:{children:React.ReactNode})=>{
    const {data} = useSession()
    const [user,setUser] = useState<User | null>(null)

    const logOut = ()=>{
        if(new Date(data?.expires!).getTime() < new Date().getTime()){
            signOut()
        }
    }

    useEffect(()=>{
        setUser(data?.user as User)
    },[data?.user])

    return(
        <UserContext.Provider value={{user,logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
  };