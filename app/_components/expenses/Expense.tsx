"use client"
import { Label } from '@/components/ui/label'
import { InterfaceExpense } from '@/types/types'
import React from 'react'
import DeleteExpense from './DeleteExpense'

const Expense = ({expense}:{expense:InterfaceExpense}) => {
  return (
    <div className='flex flex-row justify-between items-center p-4'>
        <div className='bg-gray-300 p-2 rounded-l-md'>
            <Label className='text-xl'>{expense.tag.tag}</Label>
        </div>
        <div className='flex flex-col'>
            <Label>${expense.amount}</Label>
        </div>
        <div className='flex flex-row items-center space-x-4'>
            <DeleteExpense id={expense._id}/>
        </div>
    </div>
  )
}

export default Expense