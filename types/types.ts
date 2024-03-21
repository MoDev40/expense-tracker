export interface TagInterface {
    _id: string;
    name: string;
    tag: string;
    user:string;
    is_public: boolean;
}

export interface ExpenseBody {
    amount: number;
    tag_id: string;
    user_id: string;
}