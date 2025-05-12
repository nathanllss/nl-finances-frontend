import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxEchartsDirective} from 'ngx-echarts';
import {EChartsOption} from 'echarts';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../../../core/models/transaction';
import {API_CONFIG} from '../../../core/constants/api.constants';
import {Subject, takeUntil} from 'rxjs';

@Component({
    selector: 'app-expense-analysis',
    imports: [
        NgxEchartsDirective
    ],
    templateUrl: './expense-analysis.component.html',
    styleUrl: './expense-analysis.component.css'
})
export class ExpenseAnalysisComponent implements OnInit, OnDestroy {
    url: string = `${API_CONFIG.baseUrl}${API_CONFIG.transactions.getFull}`;
    chartOptions: EChartsOption = {};
    isLoading = true;
    initOpts = {
        renderer: 'canvas',
        width: '100%',
        height: '100%'
    };
    private destroy$ = new Subject<void>();

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadTransactionData();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadTransactionData() {
        this.http.get<Transaction[]>(this.url)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (transactions) => {
                    const expenses = transactions.filter(t => t.type === 'EXPENSE');
                    const categoryTotals = expenses.reduce((acc, curr) => {
                        acc[curr.category.name] = (acc[curr.category.name] || 0) + Math.abs(curr.value);
                        return acc;
                    }, {} as Record<string, number>);

                    const pieData = Object.entries(categoryTotals).map(([category, total]) => ({
                        name: category,
                        value: total
                    }));

                    this.chartOptions = {
                        animation: true,
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}: R$ {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            padding: 10
                        },
                        series: [
                            {
                                name: 'Despesas por Categoria',
                                type: 'pie',
                                radius: ['40%', '70%'],
                                avoidLabelOverlap: true,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2
                                },
                                label: {
                                    show: true,
                                    formatter: '{b}: {d}%'
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                    }
                                },
                                data: pieData
                            }
                        ]
                    };
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Erro ao carregar as transações:', error);
                    this.isLoading = false;
                }
            });
    }
}
