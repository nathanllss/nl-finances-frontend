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
import {CurrencyPipe, DatePipe, NgClass, NgIf} from '@angular/common';
import {TransactionSummary} from '../../../core/models/transaction';
import {TransactionService} from '../../../core/services/transaction.service';
import {MatPaginator} from '@angular/material/paginator';

import { MatIcon } from '@angular/material/icon';

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
        DatePipe,
        MatPaginator,
        MatPaginator,
        MatIcon,
        NgIf,
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
    sortBy = 'moment';
    sortDirection = 'desc';

    constructor(private transactionService: TransactionService) {}

    ngOnInit() {
        this.loadTransactions();
    }

    loadTransactions() {
        this.transactionService.getTransactions(
            this.currentPage,
            this.pageSize,
        ).subscribe({
            next: (page) => {
                this.dataSource.data = page.content;
                this.totalElements = page.totalElements;
            },
            error: (error) => {
                console.error('Error fetching transactions:', error);
            }
        });
    }

    onPageChange(event: any) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadTransactions();
    }
}


