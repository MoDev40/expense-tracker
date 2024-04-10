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

export interface TagBody{
    user_id:string;
    name:string;
    tag:string;
}

export interface SummaryResponseInterface {
    highestExpense:InterfaceExpense;
    lowestExpense:InterfaceExpense;
    sumMonthExpenses:number;
    expenses:InterfaceExpense[];
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