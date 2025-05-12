import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {TransactionService} from '../../../core/services/transaction.service';
import {CurrencyPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-total-balance',
    imports: [
        MatCardHeader,
        MatCard,
        MatCardContent,
        MatCardTitle,
        CurrencyPipe,
        NgIf
    ],
  templateUrl: './total-balance.component.html',
  styleUrl: './total-balance.component.css'
})
export class TotalBalanceComponent {
    totalBalance: number = 0;
    totalIncome: number = 0;
    totalExpenses: number = 0;
    isLoading: boolean = true;

    constructor(private transactionService: TransactionService) {}

    ngOnInit(): void {
        this.loadTotalBalance();
    }

    private loadTotalBalance(): void {
        this.isLoading = true;
        this.transactionService.getAllTransactions().subscribe({
            next: (transactions) => {
                // Calcular receitas (INCOME)
                this.totalIncome = transactions
                    .filter(transaction => transaction.type === 'INCOME')
                    .reduce((acc, transaction) => acc + transaction.transactionValue, 0);

                // Calcular despesas (EXPENSE ou SAVING)
                this.totalExpenses = transactions
                    .filter(transaction => transaction.type === 'EXPENSE' || transaction.type === 'SAVING')
                    .reduce((acc, transaction) => acc + transaction.transactionValue, 0);

                // Calcular saldo total
                this.totalBalance = this.totalIncome - this.totalExpenses;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading transactions:', error);
                this.isLoading = false;
            }
        });
    }
}


