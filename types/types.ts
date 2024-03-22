export interface TagInterface {
    _id: string;
    name: string;
    tag: string;
    user:string;
    is_public: boolean;
}

export interface ExpenseBody {
    amount: number;
    user: string;
    tag_id: string;
}

export interface InterfaceExpense  {
    _id: string;
    amount: number;
    user: string;
    createdAt:Date;
    updatedAt:Date;
    tag:{
        _id:string;
        tag:string;
        name:string;
    }
}