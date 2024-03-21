'use server';

import connectDB from "../config/connectDB";
import TagModel from "../models/TagModel";

type InputTag = {
  id:string;
  name:string;
  tag:string;
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
        })
    } catch (error) {
        console.log(error);
    }
}