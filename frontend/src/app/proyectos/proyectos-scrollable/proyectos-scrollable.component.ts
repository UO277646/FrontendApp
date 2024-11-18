import { Component, inject, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/projectsServices/project.service';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProjectService } from '../../services/form/form-project.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalBorrarComponent } from "../../modal-borrar/modal-borrar.component";
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-proyectos-scrollable',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,NgxDatatableModule],
  templateUrl: './proyectos-scrollable.component.html',
  styleUrl: './proyectos-scrollable.component.css'
})
export class ProyectosScrollableComponent {
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'nombre', name: 'Nombre' },
    { prop: 'fechaCreacion', name: 'Fecha' },
    { name: 'Detalles' },
    { name: 'Editar' },
    { name: 'Borrar' }
  ];
  async edit() {
  if(!this.checkErrors(this.fb)){
    this.fb.controls["user"].setValue(this.email);
    const res=await this.projectService.editProject(this.idProyecto,this.fb.value);
    if(res){
      const modal = document.getElementById("createProyModal");
      modal!.style.display = "none";
      this.editPro=false;
      this.idProyecto=-1;
      this.loadProyects();
    } 
  }else{
    this.errorMessage="Algun campo vacio o erroneo"
  }
}
  async deleteProyecto(arg0: any) {
  await this.projectService.deleteProyect(arg0);
  this.showBorrarModal=false;
  this.loadProyects();
}
errorMessage: any="";
idProyecto: any=-1;
editPro=false;
editProyecto(proyecto:any) {
  this.editPro=true;
  this.idProyecto=proyecto.idProyecto;
  this.fb=this.formService.getProjectForm(proyecto)
  this.showModal();
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
    this.editPro=false;
  }
  closeDelete(){
    this.idProyecto=-1;
    this.showBorrarModal=false;
  }
  create=async()=>{
    if(!this.checkErrors(this.fb)){
      this.fb.controls["user"].setValue(this.email);
      const res=await this.projectService.createProject(this.fb.value);
      if(res){
        const modal = document.getElementById("createProyModal");
        modal!.style.display = "none";
        this.loadProyects();
      } 
    }else{
      this.errorMessage="Algun campo vacio o erroneo"
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
export interface Proyecto{
  proyectId:number;
  nombre: string,
  minConf:number ,
  user:string,
  fechaCreacion:string
}
