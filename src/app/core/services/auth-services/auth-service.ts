import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private readonly API_URL = 'http://localhost:8080/api/auth/login';

  // State management
  currentUser = signal<any>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  login(credentials: { username: string; password: any }) {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<any>(this.API_URL, credentials, {
      withCredentials: true
    }).pipe(
      tap({
        next: (response) => {
          const payloadBase64 = response.accessToken.split('.')[1];
          const decodedPayload = JSON.parse(atob(payloadBase64));
          this.currentUser.set({
            username: decodedPayload.sub,
            id: decodedPayload.id,
            loggedInOnce:decodedPayload.loggedInOnce,
            token: response.accessToken
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Login failed');
          this.isLoading.set(false);
        }
      })
    );
  }
  logout() {
    this.cookieService.delete('access_token', '/');
    this.currentUser.set(null);
  }
}
