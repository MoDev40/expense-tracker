'use client'
import { Loader, LogIn, LogOut } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Cookies from "js-cookie"
function NavBar() {
  const token = Cookies.get('token')
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const router = useRouter()
  
  const handleLogin = async () => {
    setIsLoad(true)
    await signIn("google")
    setIsLoad(false)
  }

  return (
  <nav className="flex justify-between container mx-auto p-2 lg:max-w-[1120px] max-w-lg">
    <h1 className="font-bold uppercase">
        <Link href="/">Expenses</Link>
    </h1>
    {

     token ?
      <LogOut size={20}
          className="h-5 w-5 hover:scale-110 transition-all"
          onClick={async () => {
            signOut()
            Cookies.remove("token")
            router.push("/")
          }}
      />
      :
      isLoad ? <Loader size={20} className='animate-spin' /> :

      <LogIn size={20}
          className="h-5 w-5 hover:scale-110 transition-all"
          onClick={handleLogin}
      />
    }
  </nav>
  )
}

export default NavBar