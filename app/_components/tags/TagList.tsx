'use client'
import { TagInterface } from '@/types/types'
import { Trash2 } from 'lucide-react'
import React from 'react'
import UpdateTag from './UpdateTag'

const TagList = ({tag}:{tag:TagInterface}) => {
  return (      
    <div className='flex flex-row justify-between border-b pt-4' >
        <div className='flex flex-row items-center space-x-5 py-3'>
            <h1>{tag.tag}</h1>
            <span>{tag.name}</span>
        </div>
        <div className='flex flex-row items-center space-x-5'>
            <UpdateTag tag={tag}/>
            <Trash2/>
        </div>
    </div>
  )
}

export default TagList