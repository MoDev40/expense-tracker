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

import { Form,FormField, FormItem, FormMessage } from "@/components/ui/form"

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Loader, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useUser } from "@/app/context/UserContext"
import { toast } from "@/components/ui/use-toast"
import { TagBody, TagInputs, tagSchema } from "@/types/types"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"



const CreateTag = () => {
    const {user} = useUser()
    const [isAdding,setIsAdding] = useState<boolean>(false)
    const router = useRouter()
    const form = useForm<TagInputs>({resolver:zodResolver(tagSchema)})
    const onSubmit : SubmitHandler<TagInputs> = async(data) => {
        setIsAdding(true)
        const tag : TagBody = {name: data.name, tag: data.tag,user_id:user?.id!}
        await fetch('/api/tags/create',{
            method:"POST",
            body:JSON.stringify(tag)
        }).then(()=>{
            toast({
                title: "Created Tag",
                description: "Tag has been created successfully",
                duration: 3000,
            })
            form.reset()
        }).catch((error:any)=>{
            toast({
                title: "Created Tag",
                description: error.message|| "Unexpected error occurred",
                variant:"destructive"
            })
        }).finally(()=>{
            setIsAdding(false)
            router.refresh()
        })
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <PlusCircle size={20}/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Tag</DialogTitle>
                <DialogDescription>Create new tag..</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center flex-col space-y-4">
                    <FormField
                    control={form.control}
                    defaultValue=""
                    name="name"
                    render={({field})=>(
                        <FormItem  className={cn("w-full")} >
                            <Input type="text" placeholder="name eg. rent" {...field}/>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="tag"
                    defaultValue=""
                    render={({field})=>(
                        <FormItem  className={cn("w-full")} >
                            <Input type="text" placeholder="tag eg. 🏡" {...field}/>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button className={cn("w-full")} type="submit">
                        {
                            isAdding ? <Loader className="animate-spin" size={20}/> : "save"
                        }
                    </Button>                
                </form>
            </Form> 
        </DialogContent>
    </Dialog>
  )
}
export default CreateTag