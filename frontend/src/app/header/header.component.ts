import { afterNextRender, Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  title = 'Build Vision';
  router=inject(Router)
  subtitle = 'Detección de objetos en obras de construcción para una mayor eficiencia';
  hidden=false;
  auth=inject(AuthService);
  signOut(){
    sessionStorage.removeItem("loggedInUser")
    this.auth.signOut();
  }
  
}
