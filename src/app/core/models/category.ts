export enum CategoryType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE'
}

export interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    colorHex: string;
    type: CategoryType;
}

