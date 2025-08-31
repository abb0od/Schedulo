import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

export enum UserType {
  Normal = 0,
  Business = 1
}

export interface SignUpDto {
  fullName?: string;
  email: string;
  password: string;
  type: UserType;
}

export interface AuthResponse {
  token: string;
}

export interface DecodedToken {
  sub: string;
  email: string;
  scope: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5277/api/auth';
  private tokenKey = 'auth_token';
  private userTypeSubject = new BehaviorSubject<UserType | null>(null);
  
  userType$ = this.userTypeSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkStoredToken();
  }

  private checkStoredToken() {
    const token = this.getToken();
    if (token) {
      this.decodeToken(token);
    }
  }

  signUp(dto: SignUpDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, dto).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  signIn(dto: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, dto).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  private handleAuthResponse(response: AuthResponse) {
    if (response.token) {
      localStorage.setItem(this.tokenKey, response.token);
      this.decodeToken(response.token);
    }
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload) as DecodedToken;
      const userType = decoded.scope.includes('user.type:Business') ? UserType.Business : UserType.Normal;
      this.userTypeSubject.next(userType);
      return decoded;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded) return false;

    return decoded.exp * 1000 > Date.now();
  }

  getUserType(): UserType | null {
    return this.userTypeSubject.value;
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    const decoded = this.decodeToken(token);
    return decoded?.sub || null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userTypeSubject.next(null);
  }
}
