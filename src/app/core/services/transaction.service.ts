import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction, TransactionSummary} from '../models/transaction';
import {API_CONFIG} from '../constants/api.constants';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
    private apiUrl = `${API_CONFIG.baseUrl}/transactions`;

    constructor(private http: HttpClient) {}

    getTransactions(page: number = 0, size: number = 10): Observable<Page<TransactionSummary>> {
        return this.http.get<Page<TransactionSummary>>(`${this.apiUrl}?page=${page}&size=${size}`);
    }

    getAllTransactions(): Observable<TransactionSummary[]> {
        return this.http.get<TransactionSummary[]>(`${this.apiUrl}/all`);
    }

    getAllFullTransactions(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}/all/full`);
    }

}

