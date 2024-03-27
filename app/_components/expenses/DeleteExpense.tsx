"use client"
import { deleteMyExpense } from '@/app/actions/expense.action'
import { Loader, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteExpense = ({id}:{id:string}) => {
    const [isDeleting,setIsDeleting] = useState<boolean>(false)
    const router = useRouter()
    const handleDelete = async()=>{
      setIsDeleting(true)
      await deleteMyExpense(id).then(()=>{
        router.refresh()
      }).finally(()=>{
        setIsDeleting(false)
      })
    }
  return (
    isDeleting ? <Loader className='animate-spin' size={20} />
    :
    <Trash2 onClick={handleDelete} color='red' size={20}/>
  )
}


export default DeleteExpense