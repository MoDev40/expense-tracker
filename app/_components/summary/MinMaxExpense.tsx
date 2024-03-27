import { Label } from '@/components/ui/label'
import { InterfaceExpense } from '@/types/types'
import React from 'react'

const MinMaxExpense = ({label,data}:{label:string,data:InterfaceExpense}) => {
  return (
    <div className='flex flex-row justify-between items-center'>
        <div className='bg-gray-300 p-2 rounded-l-md'>
            <Label className='text-xl font-semibold'>{data?.tag?.tag}</Label>
        </div>
        <div className='flex flex-col'>
            <Label>{label}</Label>
        </div>
        <div>
            <Label>${data?.amount}</Label>
        </div>
    </div>
    )
}

export default MinMaxExpense