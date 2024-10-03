import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  auth=inject(AuthService);
  signOut(){
    this.auth.signOut();
  }
}
