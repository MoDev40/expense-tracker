import { SummaryResponseInterface } from '@/types/types'
import MinMaxExpense from './MinMaxExpense'
import BarChar from './BarChar'
import { Label } from '@/components/ui/label'
import { getServerSession } from 'next-auth'


const summaryData : (email:string) => Promise<SummaryResponseInterface> = async(email)=>{
  try {
    const res = await fetch(`https://expense-tracker-gray-seven.vercel.app/api/expenses/summary/${email}`,{cache:"no-cache"})
    return  res.ok ? await res.json() : {}
  } catch (error) {
    console.log(error);
  }
}

const Summary = async() => {
  const session = await getServerSession()
  const {sumMonthExpenses,highestExpense,lowestExpense,expenses} = await summaryData(session?.user.email!)
  return (
    <div className='flex flex-col space-y-5'>
        <div className='w-full space-y-3'>
            <Label>Total amount spent this month</Label>
            <h1 className='font-black text-2xl text-red-400'>-${sumMonthExpenses}</h1>
        </div>
        <BarChar expenses={expenses!}/>
        <MinMaxExpense label='Max' data={highestExpense!}/>
        <MinMaxExpense label='Min' data={lowestExpense!}/>
    </div> 
  )
}

export default Summary