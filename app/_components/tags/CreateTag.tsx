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
import {z} from "zod"
import { Loader, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useUser } from "@/app/context/UserContext"
import { createTag } from "@/app/actions/tag.action"

const tagSchema = z.object({
    name:z.string().min(2),
    tag:z.string()
})

type TagInputs = z.infer<typeof tagSchema> 

const CreateTag = () => {
    const {user} = useUser()
    const [isAdding,setIsAdding] = useState<boolean>(false)

    const form = useForm<TagInputs>()
    const onSubmit : SubmitHandler<TagInputs> = async(data) => {
        setIsAdding(true)
        const tag = {name: data.name, tag: data.tag,id:user?.id!}
        await createTag(tag).then(()=>{
        }).catch(()=>{

        }).finally(()=>{
            setIsAdding(false)
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
                    name="name"
                    render={({field})=>(
                        <FormItem  className={cn("w-full")} >
                            <Input required type="text" placeholder="rent" {...field}/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="tag"
                    render={({field})=>(
                        <FormItem  className={cn("w-full")} >
                            <Input required type="text" placeholder="sticker or tag 🏡" {...field}/>
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