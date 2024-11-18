import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeteccionService } from '../services/detecciones/deteccion.service';
import { CommonModule } from '@angular/common';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-deteccion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxDatatableModule],
  templateUrl: './detalle-deteccion.component.html',
  styleUrl: './detalle-deteccion.component.css'
})
export class DetalleDeteccionComponent {
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'objeto', name: 'Objeto' },
    { name: 'Coordenadas (X, Y)' },
    { prop: 'weight', name: 'Ancho' },
    { prop: 'height', name: 'Alto' },
    { prop: 'confidence', name: 'Confianza' }
  ];
  detecciones: any=[]
  proyectoId: any=[]
  fecha:any=[]
  filteredDetecciones: any;
  url: any;
  constructor(private route: ActivatedRoute, private deteccionService: DeteccionService,private router: Router){

  }
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
  
    // Filtrar los datos por el valor de búsqueda en varias columnas
    const temp = this.detecciones.filter((d: { objeto: string; x: number; y: number; weight: number; height: number; confidence: number; }) => {
      return d.objeto.toLowerCase().indexOf(val) !== -1 || // Filtro por el nombre del objeto
             d.x.toString().toLowerCase().indexOf(val) !== -1 || // Filtro por la coordenada X
             d.y.toString().toLowerCase().indexOf(val) !== -1 || // Filtro por la coordenada Y
             d.weight.toString().toLowerCase().indexOf(val) !== -1 || // Filtro por el ancho
             d.height.toString().toLowerCase().indexOf(val) !== -1 || // Filtro por el alto
             d.confidence.toString().toLowerCase().indexOf(val) !== -1; // Filtro por la confianza
    });
  
    // Actualizar las filas filtradas
    this.filteredDetecciones = temp;
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
    const base64Image = await this.deteccionService.getImagenDia(this.proyectoId, this.fecha);
    this.url = 'data:image/png;base64,' + base64Image;
    if(res){
      this.detecciones=res;
      this.filteredDetecciones=this.detecciones;
    }
  }
}
