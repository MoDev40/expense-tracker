'use client'
import { SessionProvider } from "next-auth/react"
import React from "react"
import { UserProvider } from "@/app/context/UserContext"

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionProvider>
  )
}

export default Provider