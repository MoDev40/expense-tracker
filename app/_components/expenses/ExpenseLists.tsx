import { InterfaceExpense } from '@/types/types'
import Expense from './Expense'
import { getServerSession } from 'next-auth'

interface ResponseType {
    expenses:InterfaceExpense[]
}


const expenseData : (email:string) => Promise<ResponseType> = async(email)=>{
  try {
    const res = await fetch(`https://expense-tracker-gray-seven.vercel.app/api/expenses/${email}`,{cache:"no-cache"})
    return  res.ok ? await res.json() : []
  } catch (error) {
    console.log(error);
  }
}

const ExpenseLists = async() => {
    const session = await getServerSession()
    const {expenses} = await expenseData(session?.user.email!)
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