import { afterNextRender, Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  projectId: any;
  constructor(private route: ActivatedRoute){}
  title = 'Build Vision';
  router=inject(Router)
  subtitle = 'Detección de objetos en obras de construcción para una mayor eficiencia';
  hidden=false;
  auth=inject(AuthService);
  signOut(){
    sessionStorage.removeItem("loggedInUser")
    this.auth.signOut();
  }
  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     const segments = this.router.url.split('/');
  //     const projectIndex = segments.indexOf('proyecto');
  //     if (projectIndex !== -1 && segments[projectIndex + 1]) {
  //       this.projectId = segments[projectIndex + 1];
  //     } else {
  //       this.projectId = null;
  //     }
  //   });
  // }
}
