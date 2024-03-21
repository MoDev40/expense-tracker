'use client'
import { deleteTag } from '@/app/actions/tag.action'
import { Loader, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const DeleteTag = ({_id}:{_id:string}) => {
  const [isDeleting,setIsDeleting] = useState<boolean>(false)
  async function handleDelete (){
        setIsDeleting(true)
        await deleteTag({id:_id})
        setIsDeleting(false)
    }
  return (
    isDeleting ? <Loader className='animate-spin' size={20} />
    :
    <Trash2 onClick={handleDelete} color='red' size={20}/>
  )
}

export default DeleteTag