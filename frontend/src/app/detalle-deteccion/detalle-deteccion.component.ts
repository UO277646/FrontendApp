import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeteccionService } from '../services/detecciones/deteccion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-deteccion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-deteccion.component.html',
  styleUrl: './detalle-deteccion.component.css'
})
export class DetalleDeteccionComponent {
  detecciones: any=[]
  proyectoId: any=[]
  fecha:any=[]
  constructor(private route: ActivatedRoute, private deteccionService: DeteccionService,private router: Router){

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
    this.fecha = this.route.snapshot.paramMap.get('fecha');

    const res= await this.deteccionService.getDeteccionesDia(this.proyectoId,this.fecha);
    if(res){
      this.detecciones=res;
    }
  }
}
