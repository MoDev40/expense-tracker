import { TagInterface } from '@/types/types'
import TagList from './TagList'
import { getServerSession } from 'next-auth'
interface ResponseType {
  tags:TagInterface[]
}

const tagsData : () => Promise<ResponseType> = async()=>{
  const session = await getServerSession()
  const res = await fetch(`http://localhost:3000/api/tags/get-user-tags/${session?.user.email}`,{cache:"no-cache"})
  return  res.ok ? await res.json() : []
}

const TagLists = async() => {
  const {tags} = await tagsData()
  return (
    <div className='flex flex-col'>
        { tags ? 
          tags.map((tag)=>(
              <TagList key={tag._id} tag={tag} />
          )) : <h1>No data</h1>
        }
    </div>
  )
}


export default TagLists