"use client"
import React from 'react'
import useSWR, { Fetcher } from 'swr'
import { TagInterface } from '@/types/types'
import { useSession } from 'next-auth/react'
import { Loader } from 'lucide-react'
import TagList from './TagList'
import { useUser } from '@/app/context/UserContext'
interface ResponseType {
  tags:TagInterface[]
}
const fetcher : Fetcher<any,string> = (url) :Promise<ResponseType> => fetch(url,{cache:"no-cache"}).then((res)=>res.json())
const TagLists = () => {
  const {user} = useUser()
  const {data,isLoading} = useSWR<ResponseType>(`api/tags/get-user-tags/${user?.id}`,fetcher)
  return (
    isLoading ? <Loader className='animate-spin' /> :
    <div className='flex flex-col'>
        { data?.tags&&
          data.tags.map((tag)=>(
              <TagList tag={tag} />
          ))
        }
    </div>
  )
}


export default TagLists