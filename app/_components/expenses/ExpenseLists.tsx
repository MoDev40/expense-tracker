import { InterfaceExpense } from '@/types/types'
import Expense from './Expense'
import { getServerSession } from 'next-auth'

interface ResponseType {
    expenses:InterfaceExpense[]
}


const ExpenseLists = async() => {
    const session = await getServerSession()
    const res = await fetch(`http://localhost:3000/api/expenses/user-expenses/${session?.user.email}`)
    const data : ResponseType = await res.json()
  return (
    <div className='space-y-5 h-screen'>
        {
            data?.expenses&&
            data.expenses.map(expense =>(
                <Expense key={expense._id} expense={expense}/>
            ))
        }
    </div>
  )
}

export default ExpenseLists