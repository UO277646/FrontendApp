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
  showModal(){
    const modal = document.getElementById("createProyModal");
    modal!.style.display = "block";
  }
  closeModal(){
    const modal = document.getElementById("createProyModal");
    modal!.style.display = "none";
  }
  create=async()=>{
    const inputElement = document.getElementById("projectName") as HTMLInputElement;
    const projectName = inputElement.value;  // Obtén el valor correctamente
    const res=await this.projectService.createProject(projectName);
    if(res){
      const modal = document.getElementById("createProyModal");
      modal!.style.display = "none";
      this.proyectos =this.projectService.getProjects();
    }
  }


}
