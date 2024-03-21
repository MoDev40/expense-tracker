import { Schema, models,model, Model } from "mongoose";

interface UserDocument extends Document {
    name: string;
    email: string;
}

const userSchema = new Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const UserModel = models.User || model("User",userSchema);

export default UserModel as Model<UserDocument>;