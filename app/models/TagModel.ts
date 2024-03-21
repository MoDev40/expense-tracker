import { Model, Schema, model, models } from "mongoose";

interface TagDocument extends Document {
    tag: string;
    name: string;
    user:Schema.Types.ObjectId;
    is_public: boolean;
}

const tagSchema = new Schema({
    tag: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
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

const TagModel = models.TagMD || model("TagMD",tagSchema)

export default TagModel as Model<TagDocument>;