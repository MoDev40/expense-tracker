"use client"
import { updateMyExpense } from "@/app/actions/expense.action"
import { useUser } from "@/app/context/UserContext"
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
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { InterfaceExpense, TagInterface } from "@/types/types"
import { FileEdit, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import useSWR, { Fetcher } from "swr"
import {z} from "zod"

const newExpenseSchema = z.object({
    price:z.string().min(0),
    tag:z.string()
})

type Inputs = z.infer<typeof newExpenseSchema>
interface ResponseType {
    tags:TagInterface[]
}
const fetcher: Fetcher<any,string> = (url): Promise<ResponseType> => fetch(url,{cache:"no-cache"}).then((res) => res.json());


const UpdateExpense = ({expense}:{expense:InterfaceExpense}) => {
    const [isUpdating,setIsUpdating] = useState<boolean>(false);
    const form = useForm<Inputs>();
    const {user} = useUser()
    const {data,isLoading} = useSWR<ResponseType>(`/api/tags/get-both-tags/${user?.id}`,fetcher)
    const onSubmit : SubmitHandler<Inputs> = async(data)=>{
        setIsUpdating(true)
        const updatedData = {amount:Number(data.price),tag_id:data.tag,user:expense.user};
        await updateMyExpense({expense_id:expense._id,data:updatedData}).then(()=>{
          toast({
            title: "Updated Expense",
            description: "Expense has been created successfully",
            duration: 3000,
          })
        form.reset()
        }).catch(()=>{
          toast({
            title: "Updated Expense",
            description: "Unexpected error occurred",
            variant:"destructive"
          })
        }).finally(()=>{
          setIsUpdating(false)
        })
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
       <FileEdit size={22}/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Expense</DialogTitle>
          <DialogDescription>
            Update existing expense.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
        { !isLoading ? <Loader className="animate-spin"/> :
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center flex-col space-y-4">
            <FormField
            control={form.control}
            defaultValue={expense.amount.toString()}
            name="price"
            render={({field})=>(
                <FormItem  className={cn("w-full")} >
                    <Input required type="number" placeholder="0.00" {...field}/>
                </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="tag"
            defaultValue={expense.tag._id}
            render={({field})=>(
                <FormItem  className={cn("w-full")} >
                    <Select required onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue defaultValue={expense.tag.tag}   placeholder="Select a Tag" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {   data?.tags&&
                        data.tags.map((tag) => (
                                <SelectItem key={tag._id} value={tag._id}>
                                    {tag.tag.concat(" ") + tag.name }
                                </SelectItem>
                            )
                        )
                        
                    }
                    </SelectContent>
                    </Select>
                </FormItem>
            )}
            />
            <Button  className={cn("w-full")}  type="submit">
              { isUpdating ? <Loader size={20} className="animate-spin"/> : "Update"}
            </Button>
        </form>
        }
        </Form>  
      </DialogContent>
    </Dialog>
  )
}

export default UpdateExpense