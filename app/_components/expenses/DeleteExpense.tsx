"use client"
import { toast } from '@/components/ui/use-toast'
import { Loader, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteExpense = ({id}:{id:string}) => {
    const [isDeleting,setIsDeleting] = useState<boolean>(false)
    const router = useRouter()
    const handleDelete = async()=>{
      setIsDeleting(true)
      await fetch(`/api/expenses/delete/${id}`,{method:"DELETE"}).then(()=>{
        toast({
          title: "Deleted Expense",
          description: "Expense has been deleted successfully",
          duration: 3000,
      })
      }).catch(()=>{
        toast({
          title: "Deleted Expense",
          description: "Unexpected error occurred",
          variant:"destructive"
        })
      }).finally(()=>{
        setIsDeleting(false)
        router.refresh()
      })
    }
  return (
    isDeleting ? <Loader className='animate-spin' size={20} />
    :
    <Trash2 onClick={handleDelete} color='red' size={20}/>
  )
}


export default DeleteExpense