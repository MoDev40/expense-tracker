import { SummaryResponseInterface } from '@/types/types'
import MinMaxExpense from './MinMaxExpense'
import BarChar from './BarChar'
import { Label } from '@/components/ui/label'
import { getServerSession } from 'next-auth'
import { api } from '@/app/config/config'

export const dynamic = 'force-dynamic'

const Summary = async() => {
  const session = await getServerSession()
  const res = await fetch(`${api}/expenses/user-expenses/summary/${session?.user.email}`)
  const data : SummaryResponseInterface= await res.json()
  return (
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