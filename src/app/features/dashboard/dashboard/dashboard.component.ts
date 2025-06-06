import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {TotalBalanceComponent} from '../../../shared/components/total-balance/total-balance.component';
import {
    TransactionsHistoryComponent
} from '../../../shared/components/transactions-history/transactions-history.component';
import {ExpenseAnalysisComponent} from '../../../shared/components/expense-analysis/expense-analysis.component';

@Component({
  selector: 'app-dashboard',
    imports: [
        MatGridList,
        MatGridTile,
        TotalBalanceComponent,
        TransactionsHistoryComponent,
        ExpenseAnalysisComponent,
        ExpenseAnalysisComponent,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
