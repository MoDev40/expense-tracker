'use client'
import React from 'react'
import { useUser } from '../context/UserContext'
import ExpenseLists from './expenses/ExpenseLists'
import UnAuth from './UnAuth'
const Home = () => {
  const {user} = useUser()
  return (
    user ? <ExpenseLists/> :
    <UnAuth/>
  )
}

export default Home