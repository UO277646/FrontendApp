import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Build Vision';
  subtitle = 'Detección de objetos en obras de construcción para una mayor eficiencia';
}
