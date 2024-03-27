"use client"
import { useUser } from '@/app/context/UserContext'
import { Label } from '@/components/ui/label'
import { SummaryResponseInterface } from '@/types/types'
import { Loader } from 'lucide-react'
import React from 'react'
import useSWR, { Fetcher } from 'swr'
import MinMaxExpense from './MinMaxExpense'
import BarChar from './BarChar'

const fetcher : Fetcher<any,string> = (url) : Promise<SummaryResponseInterface> => fetch(url,{cache:"no-cache"}).then((res)=>res.json())

const Summary = () => {
    const {user} = useUser()
    const {data,isLoading} = useSWR<SummaryResponseInterface>(`/api/expenses/user-expenses/summary/${user?.id}`,fetcher)
  return (
    isLoading ? <Loader className='animate-spin' size={20}/> :
    <div className='flex flex-col space-y-5'>
        <div className='w-full space-y-3'>
            <Label>Total amount spent this month</Label>
            <h1 className='font-black text-2xl text-red-400'>-${data?.sumMonthExpenses}</h1>
        </div>
        <BarChar expenses={data?.expenses!}/>
        <MinMaxExpense label='Highest expense payed this month' data={data?.highestExpense!}/>
        <MinMaxExpense label='Lowest expense payed this month' data={data?.lowestExpense!}/>
    </div> 
  )
}

export default Summary