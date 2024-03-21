'use client'
import { createExpense } from "@/app/actions/expense.action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ExpenseBody, TagInterface } from "@/types/types"
import { Loader, Plus } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import {z} from "zod"
import useSWR, {Fetcher} from "swr"
import { useUser } from "@/app/context/UserContext"

const newExpenseSchema = z.object({
    price:z.number().min(0),
    tag:z.string()
})

type Inputs = z.infer<typeof newExpenseSchema>
interface ResponseType {
    tags:TagInterface[]
}
const fetcher: Fetcher<any,string> = (url): Promise<ResponseType> => fetch(url,{cache:"no-cache"}).then((res) => res.json());

const CreateExpense = () => {
    const [isCreating,setIsCreating] = useState<boolean>(false);
    const {user} =  useUser()
    const {data,isLoading} = useSWR<ResponseType>(`/api/tags/get-both-tags/${user?.id}`,fetcher)
    const form = useForm<Inputs>();
    const onSubmit : SubmitHandler<Inputs> = async(data)=>{
        setIsCreating(true)
        const expBody : ExpenseBody = {user_id:user?.id!,amount:Number(data.price),tag_id:data.tag}
        await createExpense(expBody).then(()=>{

        }).catch(()=>{

        }).finally(()=>{
            setIsCreating(false)
        })
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Plus/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Expense</DialogTitle>
          <DialogDescription>
            Create new expense.
          </DialogDescription>
        </DialogHeader>
        {
            isLoading ? <Loader className=" animate-spin"/> :
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center flex-col space-y-10">
                <FormField 
                control={form.control}
                name="tag"
                render={({field})=>(
                    <FormItem  className={cn("w-full")} >
                        <Select required onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a Tag" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        { 
                            data?.tags.map((tag) => (
                                <SelectItem key={tag._id} value={tag._id}>
                                    {tag.tag.concat(" ") + tag.name}
                                </SelectItem>
                            ))                        
                        }
                        </SelectContent>
                        </Select>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="price"
                render={({field})=>(
                    <FormItem  className={cn("w-full")} >
                        <Input required type="number" placeholder="0.00" {...field}/>
                    </FormItem>
                )}
                />
                <Button  className={cn("w-full")}  type="submit">
                    {
                        isCreating ? <Loader size={20} className="animate-spin"/> : "Create"
                    }
                </Button>
            </form>
            </Form>
        }
      </DialogContent>
    </Dialog>
  )
}

export default CreateExpense