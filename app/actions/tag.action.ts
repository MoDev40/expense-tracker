'use server';

import connectDB from "../config/connectDB";
import TagModel from "../models/TagModel";

type InputTag = {
  id:string;
  name:string;
  tag:string;
}

interface UpdateInputs extends InputTag {
    user_id:string;
}

export async function createTag(tag:InputTag) : Promise<void>{
    try {
        connectDB()
        const newTag = {
            tag:tag.tag,
            name:tag.name,
            user:tag.id
        }

        const createdTag = new TagModel(newTag);
        createdTag.save().then(()=>{

        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
        })
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateMyTag(data:UpdateInputs){
    try {
       await TagModel.findByIdAndUpdate(
            {_id:data.id,user:data.user_id},
            {name:data.name,tag:data.tag}
        )
    } catch (error) {
        console.log(error);
    }

}
export async function deleteTag(id:string){
    try {
       await TagModel.findOneAndDelete({_id:id})
    } catch (error) {
        console.log(error);
    }

}