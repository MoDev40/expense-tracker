'use client'
import { deleteTag } from '@/app/actions/tag.action'
import { toast } from '@/components/ui/use-toast'
import { Loader, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const DeleteTag = ({_id}:{_id:string}) => {
  const [isDeleting,setIsDeleting] = useState<boolean>(false)
  async function handleDelete (){
        setIsDeleting(true)
        await deleteTag({id:_id}).then(()=>{
          toast({
            title: "Delete Tag",
            description: "Tag has been deleted successfully",
            duration: 3000,
        })
        }).catch(()=>{
          toast({
            title: "Tag Created",
            description: "Unexpected error occurred",
            variant:"destructive"
          })
        })
        setIsDeleting(false)
    }
  return (
    isDeleting ? <Loader className='animate-spin' size={20} />
    :
    <Trash2 onClick={handleDelete} color='red' size={20}/>
  )
}

export default DeleteTag