'use client'
import { Loader, LogIn, LogOut } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

function NavBar() {
  const {user} = useUser()
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const router = useRouter()
  
  const handleLogin = async () => {
    setIsLoad(true)
    await signIn("google")
    setIsLoad(false)
  }

  return (
  <nav className="flex justify-between">
    <h1 className="font-bold uppercase">
        <Link href="/">Expenses</Link>
    </h1>
    {

     user ?
      <LogOut size={20}
          className="h-5 w-5 hover:scale-110 transition-all"
          onClick={async () => {
            signOut()
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