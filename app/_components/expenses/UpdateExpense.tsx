"use client"
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { ExpInputs, ExpenseBody, InterfaceExpense, TagInterface, expenseSchema } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileEdit, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import useSWR, { Fetcher } from "swr"

interface ResponseType {
    tags:TagInterface[]
}
const fetcher: Fetcher<any,string> = (url): Promise<ResponseType> => fetch(url,{cache:"no-cache"}).then((res) => res.json());


const UpdateExpense = ({expense}:{expense:InterfaceExpense}) => {
    const [isUpdating,setIsUpdating] = useState<boolean>(false);
    const router = useRouter()
    const form = useForm<ExpInputs>({resolver:zodResolver(expenseSchema)});
    const {user} = useUser()
    const {data,isLoading} = useSWR<ResponseType>(`/api/tags/get-both-tags/${user?.id}`,fetcher)
    const onSubmit : SubmitHandler<ExpInputs> = async(data)=>{
        setIsUpdating(true)
        const updatedData : ExpenseBody = {amount:Number(data.price),tag_id:data.tag,user:expense.user};
        await fetch(`/api/expenses/update/${expense._id}`,{
          method:"PUT",
          body:JSON.stringify(updatedData)
        }).then(()=>{
          toast({
            title: "Updated Expense",
            description: "Expense has been Updated successfully",
            duration: 3000,
          })
        }).catch(()=>{
          toast({
            title: "Updated Expense",
            description: "Unexpected error occurred",
            variant:"destructive"
          })
        }).finally(()=>{
          setIsUpdating(false)
          form.reset()
          router.refresh()
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
        { isLoading ? <Loader className="animate-spin"/> :
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center flex-col space-y-4">
            <FormField
            control={form.control}
            defaultValue={expense.amount.toString()}
            name="price"
            render={({field})=>(
                <FormItem  className={cn("w-full")} >
                    <Input required type="number" placeholder="0.00" {...field}/>
                    <FormMessage/>
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
                        <SelectValue defaultValue={expense?.tag.tag}   placeholder="Select a Tag" />
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
                    <FormMessage/>
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