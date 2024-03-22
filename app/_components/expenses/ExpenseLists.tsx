"use client"
import { InterfaceExpense } from '@/types/types'
import { Loader } from 'lucide-react'
import React from 'react'
import useSWR, { Fetcher } from 'swr'
import { useUser } from '@/app/context/UserContext'
import Expense from './Expense'

interface ResponseType {
    expenses:InterfaceExpense[]
}

const fetcher : Fetcher<any,string> = (url) : Promise<ResponseType> => fetch(url,{cache:"no-cache"}).then((res)=>res.json())

const ExpenseLists = () => {
    const {user} = useUser()
    const {data,isLoading} = useSWR<ResponseType>(`/api/expenses/user-expenses/${user?.id}`,fetcher)
  return (
    isLoading ? <Loader size={20} className='animate-spin text-center'/> :
    <div>
        {
            data?.expenses&&
            data.expenses.map(expense =>(
                <Expense expense={expense}/>
            ))
        }
    </div>
  )
}

export default ExpenseLists