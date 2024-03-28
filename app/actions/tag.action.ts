'use server';

import connectDB from "../config/connectDB";
import ExpenseModel from "../models/ExpenseModel";
import TagModel from "../models/TagModel";

type InputTag = {
  id:string;
  name:string;
  tag:string;
}

interface UpdateInputs extends InputTag {
    user_id:string;
}

export async function createTag(tag:InputTag){
    return new Promise(async(resolve, reject) => {
        connectDB()
        const newTag = {
            tag:tag.tag,
            name:tag.name,
            user:tag.id
        }
        const isTagExists = await TagModel.find({
            $or:[
                {name:tag.name},
                {tag:tag.tag}
            ]
        })
        if(isTagExists.length>0){
            reject("Tag already exists")
            return
        }
        const createdTag = new TagModel(newTag);
        createdTag.save().then(()=>{
            resolve("Tag created")
        }).catch((err)=>{
            reject("Error saving Tag: " + err.message)
        })
    })
}

export async function UpdateMyTag(data:UpdateInputs){
    await TagModel.findByIdAndUpdate(
        {_id:data.id,user:data.user_id},
        {name:data.name,tag:data.tag}
    )
}
export async function deleteTag(id:string){
    return new Promise(async(resolve, reject) => {
        const expenseRelatedTag = await ExpenseModel.find({tag:id})
        if(expenseRelatedTag.length > 0){
            reject("Tag is used in expenses")
            return
        }
        await TagModel.findOneAndDelete({_id:id})
        resolve("Tag Deleted")
    })
}