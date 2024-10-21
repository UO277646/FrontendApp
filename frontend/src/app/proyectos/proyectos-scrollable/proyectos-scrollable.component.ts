import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/projectsServices/project.service';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProjectService } from '../../services/form/form-project.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalBorrarComponent } from "../../modal-borrar/modal-borrar.component";

@Component({
  selector: 'app-proyectos-scrollable',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ModalBorrarComponent],
  templateUrl: './proyectos-scrollable.component.html',
  styleUrl: './proyectos-scrollable.component.css'
})
export class ProyectosScrollableComponent {
deleteProyecto(arg0: any) {
  this.projectService.deleteProyect(arg0);
}
errorMessage: any="";
idProyecto: any=-1;

editProyecto() {
throw new Error('Method not implemented.');
}
setProyectoForDelete(arg0: any) {
  this.showBorrarModal=true;
  this.idProyecto=arg0;
}
  nombre=JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  email=JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  
  navigateToProject(idProyecto: number) {
  const currentUrl = "http://localhost:4200";
  this.router.navigate([`proyecto/${idProyecto}`]);
}
  proyectos: any = [];
  formService=inject(FormProjectService);
  showBorrarModal=false;
  fb:FormGroup=this.formService.getProjectForm();
  constructor(private projectService: ProjectService,private router: Router) {
    
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
    if(!this.checkErrors(this.fb)){
      this.fb.controls["user"].setValue(this.email);
      const res=await this.projectService.createProject(this.fb.value);
      if(res){
        const modal = document.getElementById("createProyModal");
        modal!.style.display = "none";
        this.loadProyects();
      } 
    }else{
      this.errorMessage="Complete los campos vacios"
    }
    
  }
  loadProyects=async()=>{
    const res= await this.projectService.getProjects(this.email,this.nombre);
    if(res){
      this.proyectos=res;
    }
  }
  checkErrors = (formGroup: FormGroup) => {
    let hasErrors = false;
    const group = formGroup;
    if (formGroup instanceof FormArray) {
      formGroup.controls.forEach((element) => {
        hasErrors = this.checkErrors(element as FormGroup);
      });
    } else {
      Object.entries(formGroup!.controls).forEach((element: any) => {
        if (element[1].errors != null) {
          hasErrors = true;
          element[1].markAsTouched({ onlySelf: true });
        }
      });
    }
    return hasErrors;
  };

}
