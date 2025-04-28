import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, LoginResponse, UserDto } from '../models';
import { API_CONFIG } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: any = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.setCurrentUserFromToken(token);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return new Observable(observer => {
      this.http.post<LoginResponse>(`${API_CONFIG.baseUrl}${API_CONFIG.auth.login}`, credentials)
        .subscribe({
          next: (response: LoginResponse) => {
            this.setToken(response.accessToken);
            this.setCurrentUserFromToken(response.accessToken);
            observer.next(response);
            observer.complete();
          },
          error: (error) => observer.error(error)
          // TODO: implementar toastr para mostrar o erro de login
        });
    });
  }




  register(user: UserDto): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${API_CONFIG.baseUrl}${API_CONFIG.auth.register}`, user)
        .subscribe({
          next: (response) => {
            observer.next(response);
            observer.complete();
          },
          error: (error) => observer.error(error)
          // TODO: implementar toastr para mostrar o erro de registro
        });
    });
  }


   logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

   isAuthenticated(): boolean {
    return !!this.getToken();
  }

   getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

   private setToken(token: string) {
    localStorage.setItem('token', token);
   }

   private setCurrentUserFromToken(token: string) {
    const userInfo =  this.decodeToken(token);
    this.currentUserSubject.next(userInfo);
   }

   private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
   }
}
