import React from 'react'
import ExpenseLists from '../_components/expenses/ExpenseLists'

function page() {
  return (
    <div className='mx-auto space-y-4 mt-5 p-2 lg:max-w-[1120px] max-w-lg"'>
      <ExpenseLists/>
    </div>
  )
}

export default page