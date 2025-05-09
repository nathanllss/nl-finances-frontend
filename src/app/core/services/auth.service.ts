import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LoginRequest, LoginResponse, UserDto} from '../models';
import {API_CONFIG} from '../constants/api.constants';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkAuthStatus();
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return new Observable(observer => {
            this.http.post<LoginResponse>(`${API_CONFIG.baseUrl}${API_CONFIG.auth.login}`, credentials, {
                headers, withCredentials: true
            })
                .subscribe({
                    next: (response: LoginResponse) => {
                        this.getUserInfo();
                        observer.next(response);
                        observer.complete();
                    },
                    error: (error) => observer.error(error)
                });
        });
    }

    register(user: UserDto): Observable<any> {
        return new Observable(observer => {
            this.http.post<any>(`${API_CONFIG.baseUrl}${API_CONFIG.auth.register}`, user, {withCredentials: true}
            )
                .subscribe({
                    next: (response) => {
                        observer.next(response);
                        observer.complete();
                    },
                    error: (error) => observer.error(error)
                });
        });
    }

    // logout(): Observable<void> {
    //     return new Observable(observer => {
    //         this.http.post<void>(
    //             `${API_CONFIG.baseUrl}${API_CONFIG.auth.logout}`,
    //             {},
    //             { withCredentials: true }
    //         ).subscribe({
    //             next: () => {
    //                 this.currentUserSubject.next(null);
    //                 observer.next();
    //                 observer.complete();
    //             },
    //             error: (error) => {
    //                 // Mesmo com erro, limpar o usuário local
    //                 this.currentUserSubject.next(null);
    //                 observer.error(error);
    //             }
    //         });
    //     });
    // }

    isAuthenticated(): Observable<boolean> {
        if (this.currentUserSubject.value) {
            return of(true);
        }

        return this.getUserInfo().pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }

    private getUserInfo(): Observable<any> {
        return new Observable(observer => {
            this.http.get<UserDto>(
                `${API_CONFIG.baseUrl}${API_CONFIG.users.me}`,
                { withCredentials: true }
            ).subscribe({
                next: (user) => {
                    this.currentUserSubject.next(user);
                    observer.next(user);
                    observer.complete();
                },
                error: (error) => {
                    this.currentUserSubject.next(null);
                    observer.error(error);
                }
            });
        });
    }

    private checkAuthStatus(): void {
        this.getUserInfo().subscribe({
            error: () => {
                this.currentUserSubject.next(null);
            }
        });
    }
}

