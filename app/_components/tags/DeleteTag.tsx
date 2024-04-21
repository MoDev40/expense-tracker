'use client'
import { toast } from '@/components/ui/use-toast'
import { Loader, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteTag = ({_id}:{_id:string}) => {
  const [isDeleting,setIsDeleting] = useState<boolean>(false)
  const router = useRouter()
  async function handleDelete (){
        setIsDeleting(true)
        await fetch(`/api/tags/delete/${_id}`,{method:"DELETE"}).then((res)=>{
          toast({
            title: "Deleted Tag",
            description: res.ok ? "Tag has been deleted successfully" : "Maybe registered expense",
            duration: 3000,
        })
        }).catch((error:any)=>{
          toast({
            title: "Deleted Tag",
            description: error.message || "Unexpected error occurred",
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

export default DeleteTag