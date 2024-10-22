'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Form,FormField, FormItem } from "@/components/ui/form"
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FileEdit, Loader } from 'lucide-react'
import { TagBody, TagInputs, TagInterface, tagSchema } from '@/types/types'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useUser } from "@/app/context/UserContext"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"



const UpdateTag = ({tag}:{tag:TagInterface}) => {

    const {user} = useUser()
    const [isUpdating,setIsUpdating] = useState<boolean>(false)
    const router = useRouter()

    const form = useForm<TagInputs>({resolver:zodResolver(tagSchema)})
    const onSubmit : SubmitHandler<TagInputs> = async(data) => {
        setIsUpdating(true)
        const updatedTag : TagBody = {name: data.name, tag: data.tag,user_id:user?.id!}
        await fetch(`/api/tags/update/${tag._id}`,{
            method:"PUT",
            body:JSON.stringify(updatedTag)
        }).then(()=>{
            toast({
                title: "Updated Tag",
                description: "Tag has been Updated successfully",
                duration: 3000,
            })
        }).catch((error:any)=>{
            toast({
                title: "Updated Tag",
                description: error.message || "Unexpected error occurred",
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
            <FileEdit size={20}/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Tag</DialogTitle>
                <DialogDescription>Create new tag..</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center flex-col space-y-4">
                    <FormField
                    defaultValue={tag.name}
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem  className={cn("w-full")} >
                            <Input required type="text" placeholder="name" {...field}/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    defaultValue={tag.tag}
                    name="tag"
                    render={({field})=>(
                        <FormItem  className={cn("w-full")} >
                            <Input required type="text" placeholder="sticker or tag 🏡" {...field}/>
                        </FormItem>
                    )}
                    />
                    <Button className={cn("w-full")} type="submit">
                        {
                            isUpdating ? <Loader className="animate-spin" size={20}/> : "Update"
                        }
                    </Button>                
                </form>
            </Form> 
        </DialogContent>
    </Dialog>
    )
}

export default UpdateTag