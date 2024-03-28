import { TagInterface } from '@/types/types'
import TagList from './TagList'
import { getServerSession } from 'next-auth'
import { api } from '@/app/config/config'
interface ResponseType {
  tags:TagInterface[]
}

export const dynamic = 'force-dynamic'

const TagLists = async() => {
  const session = await getServerSession()
  const res = await fetch(`${api}/tags/get-user-tags/${session?.user.email}`,{cache:"no-cache"})
  const data : ResponseType = await res.json()
  return (
    <div className='flex flex-col'>
        { data?.tags ? 
          data.tags.map((tag)=>(
              <TagList key={tag._id} tag={tag} />
          )) : <h1>Try again</h1>
        }
    </div>
  )
}


export default TagLists