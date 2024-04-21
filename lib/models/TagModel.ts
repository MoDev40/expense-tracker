import { Model, Schema, model, models } from "mongoose";

export interface TagDocument extends Document {
    tag: string;
    name: string;
    user:Schema.Types.ObjectId;
    is_public: boolean;
}

const tagSchema = new Schema({
    tag: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    is_public: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const TagModel = models.Tag || model("Tag",tagSchema)

export default TagModel as Model<TagDocument>;