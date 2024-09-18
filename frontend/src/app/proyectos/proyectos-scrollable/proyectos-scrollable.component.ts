import { Component } from '@angular/core';
import { ProjectService } from '../../services/projectsServices/project.service';

@Component({
  selector: 'app-proyectos-scrollable',
  standalone: true,
  imports: [],
  templateUrl: './proyectos-scrollable.component.html',
  styleUrl: './proyectos-scrollable.component.css'
})
export class ProyectosScrollableComponent {
  proyectos: any = [];
  constructor(private projectService: ProjectService) {
      
   }
   async ngOnInit() {
    try {
      this.proyectos = await this.projectService.getProjects();
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  }
}
