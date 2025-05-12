import {Category} from './category';

export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    SAVING = 'SAVING',
    TRANSFER = 'TRANSFER'
}

export interface Transaction {
    id: string | null;
    title: string;
    description: string;
    category: Category;
    type: TransactionType;
    moment: string; // Using string for OffsetDateTime
    value: number;  // Using number for BigDecimal
    recurring: boolean;
}


export interface TransactionSummary {
    id: string | null;
    title: string;
    description: string;
    type: 'INCOME' | 'EXPENSE' | 'SAVING' | 'TRANSFER';
    moment: string;
    transactionValue: number;
    recurring?: boolean;
}
