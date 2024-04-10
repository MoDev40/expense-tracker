import { TagInterface } from '@/types/types'
import TagList from './TagList'
import { getServerSession } from 'next-auth'
interface ResponseType {
  tags:TagInterface[]
}

const tagsData : (email:string) => Promise<ResponseType> = async(email)=>{
  try {
    const res = await fetch(`https://expense-tracker-gray-seven.vercel.app/api/tags/get-user-tags/${email}`,{cache:"no-cache"})
    return  res.ok ? await res.json() : []
  } catch (error) {
    console.log(error);
  }
}

const TagLists = async() => {
  const session = await getServerSession()
  const {tags} = await tagsData(session?.user.email!)
  return (
    <div className='flex flex-col'>
        { tags&& 
          tags.map((tag)=>(
              <TagList key={tag._id} tag={tag} />
          ))
        }
    </div>
  )
}


export default TagLists