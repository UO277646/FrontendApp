import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/projectsServices/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProjectService } from '../services/form/form-project.service';
import { RestriccionService } from '../services/restricciones/restriccion.service';
@Component({
  selector: 'app-detalle-proyectos',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './detalle-proyectos.component.html',
  styleUrl: './detalle-proyectos.component.css'
})
export class DetalleProyectosComponent {
  
navigateToFallo(arg0: any) {
  this.proyectoId;
  this.router.navigate([`proyecto/${this.proyectoId}/fallos/`+arg0]);}

navigateToDetect() {
  const currentUrl = this.router.url;
  this.router.navigate([`${currentUrl}/detect`]);
}

    detecciones: any=[]
    restricciones: any=[]
    proyectoId: string | null = null;
    formService=inject(FormProjectService);

    fb:FormGroup=this.formService.getRestrictionForm();

    constructor(private projectService: ProjectService,private route: ActivatedRoute, private restriccionService: RestriccionService,private router: Router) {
    
    }
    showModal(){
      const modal = document.getElementById("createRestriccionModal");
      modal!.style.display = "block";
    }
    closeModal(){
      const modal = document.getElementById("createRestriccionModal");
      modal!.style.display = "none";
    }
    createRestriccion=async()=>{
      this.fb.controls["proyectoId"].setValue(this.route.snapshot.paramMap.get('id'));
      console.log(this.fb.value);
      const res=await this.restriccionService.createRestriccion(this.fb.value);
      if(res){
        const modal = document.getElementById("createRestriccionModal");
        modal!.style.display = "none";
        this.load();
      }
    }
    async ngOnInit() {
      try {
        this.load();
      } catch (error) {
        console.error('Error al obtener los DATOS:', error);
      }
    }
    navigateToDetection(fecha: any) {
      const currentUrl = this.router.url;
      this.router.navigate([`${currentUrl}/detections/${fecha}`]);
    }
    load=async()=>{
      this.proyectoId = this.route.snapshot.paramMap.get('id');
      const res= await this.projectService.getDetecciones(this.proyectoId);
      if(res){
        this.detecciones=res;
      }
      const res2= await this.projectService.getRestricciones(this.proyectoId);
      if(res2){
        this.restricciones=res2;
      }
    }

}
