import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable, MatTableDataSource
} from '@angular/material/table';
import {CurrencyPipe, NgClass} from '@angular/common';
import {TransactionSummary} from '../../../core/models/transaction';
import {TransactionService} from '../../../core/services/transaction.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-transactions-history',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardTitle,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        MatCellDef,
        NgClass,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        CurrencyPipe,
        MatPaginator,
        MatPaginator
    ],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.css'
})
export class TransactionsHistoryComponent {
    displayedColumns: string[] = ['type', 'title', 'description', 'moment', 'transactionValue', 'recurring'];
    dataSource = new MatTableDataSource<TransactionSummary>([]);
    currentPage = 0;
    pageSize = 10;
    totalElements = 0;

    constructor(private transactionService: TransactionService) {}

    ngOnInit() {
        this.loadTransactions();
    }

    loadTransactions() {
        this.transactionService.getTransactions(this.currentPage, this.pageSize).subscribe({
            next: (page) => {
                this.dataSource.data = page.content;
                this.totalElements = page.totalElements;
            },
            error: (error) => {
                console.error('Error fetching transactions:', error);
            }
        });
    }

    // Optional: Add pagination handling
    onPageChange(event: any) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadTransactions();
    }
}


