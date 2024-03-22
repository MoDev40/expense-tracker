import { Model, Schema, model, models } from "mongoose";

interface ExpenseDocument extends Document{
    amount: number;
    user:Schema.Types.ObjectId;
    tag_id:Schema.Types.ObjectId;   
}

const expenseSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: "TagMD",
        required: true
    }
},{timestamps: true})

const ExpenseModel = models.ExpenseMD || model("ExpenseMD",expenseSchema)

export default ExpenseModel as Model<ExpenseDocument>