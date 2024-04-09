import { InterfaceExpense } from '@/types/types'
import Expense from './Expense'
import { getServerSession } from 'next-auth'

interface ResponseType {
    expenses:InterfaceExpense[]
}


const expenseData : () => Promise<ResponseType> = async()=>{
    const session = await getServerSession()
    const res = await fetch(`https://expense-tracker-gray-seven.vercel.app/api/expenses/user-expenses/${session?.user.email}`)
    return  res.ok ? await res.json() : []
  }

const ExpenseLists = async() => {
    const {expenses} = await expenseData()
  return (
    <div className='space-y-5'>
        {
            expenses&&
            expenses.map(expense =>(
                <Expense key={expense._id} expense={expense}/>
            ))
        }
    </div>
  )
}

export default ExpenseLists