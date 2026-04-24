import { Component, inject } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // For handling input data
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router';
import { AuthService } from "../../../core/services/auth-services/auth-service";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: "./login-dashboard.html",
  styleUrl: "./login-dashboard.css"
})
export class Login {
  authService = inject(AuthService);
  router= inject(Router);
  //local state for the form
  username = '';
  password = '';

  onLogin() {
    if (this.username && this.password) {
      this.authService.login({
        username: this.username,
        password: this.password
      }).subscribe({
        next: () => {
  const user= this.authService.currentUser();
  if (user && !user.loggedInOnce){
    this.router.navigate(['/setupbusiness']);
  }
  else {
    this.router.navigate(['/merchantdashboard']);
  }
        },
        error: (err) => {
          console.log('Login failed', err);
        }
      })
    }
  }
}
