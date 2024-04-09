import { SummaryResponseInterface } from '@/types/types'
import MinMaxExpense from './MinMaxExpense'
import BarChar from './BarChar'
import { Label } from '@/components/ui/label'
import { getServerSession } from 'next-auth'


const summaryData : () => Promise<SummaryResponseInterface> = async()=>{
  const session = await getServerSession()
  const res = await fetch(`http://localhost:3000/api/expenses/user-expenses/summary/${session?.user.email}`)
  return  await res.json()
}

const Summary = async() => {
  const {sumMonthExpenses,highestExpense,lowestExpense,expenses} = await summaryData()
  return (
    <div className='flex flex-col space-y-5'>
        <div className='w-full space-y-3'>
            <Label>Total amount spent this month</Label>
            <h1 className='font-black text-2xl text-red-400'>-${sumMonthExpenses}</h1>
        </div>
        <BarChar expenses={expenses!}/>
        <MinMaxExpense label='Highest expense payed this month' data={highestExpense!}/>
        <MinMaxExpense label='Lowest expense payed this month' data={lowestExpense!}/>
    </div> 
  )
}

export default Summary