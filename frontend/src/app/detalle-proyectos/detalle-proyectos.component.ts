import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/projectsServices/project.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detalle-proyectos',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './detalle-proyectos.component.html',
  styleUrl: './detalle-proyectos.component.css'
})
export class DetalleProyectosComponent {
    detecciones: any=[]
    restricciones: any=[]
    proyectoId: string | null = null;
    constructor(private projectService: ProjectService,private route: ActivatedRoute) {
    
    }
    async ngOnInit() {
      try {
        this.load();
      } catch (error) {
        console.error('Error al obtener los DATOS:', error);
      }
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
