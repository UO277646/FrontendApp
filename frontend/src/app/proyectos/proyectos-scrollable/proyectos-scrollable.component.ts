import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/projectsServices/project.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProjectService } from '../../services/form/form-project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyectos-scrollable',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './proyectos-scrollable.component.html',
  styleUrl: './proyectos-scrollable.component.css'
})
export class ProyectosScrollableComponent {
  proyectos: any = [];
  formService=inject(FormProjectService);

  fb:FormGroup=this.formService.getProjectForm();
  constructor(private projectService: ProjectService) {
    
  }
  
   async ngOnInit() {
    try {
      this.loadProyects();
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
    console.log(this.fb);

    const res=await this.projectService.createProject(this.fb.value);
    if(res){
      const modal = document.getElementById("createProyModal");
      modal!.style.display = "none";
      this.loadProyects();
    }
  }
  loadProyects=async()=>{
    const res= await this.projectService.getProjects();
    if(res){
      this.proyectos=res;
    }
  }


}
