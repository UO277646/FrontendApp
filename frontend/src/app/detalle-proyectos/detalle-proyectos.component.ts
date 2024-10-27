import { CommonModule } from '@angular/common';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Component, inject, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/projectsServices/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProjectService } from '../services/form/form-project.service';
import { RestriccionService } from '../services/restricciones/restriccion.service';
@Component({
  selector: 'app-detalle-proyectos',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,NgxDatatableModule],
  templateUrl: './detalle-proyectos.component.html',
  styleUrl: './detalle-proyectos.component.css'
})
export class DetalleProyectosComponent {
  filteredRestricciones: any;
  async edit() {
  if(!this.checkErrors(this.fb)){
    this.fb.controls["proyectoId"].setValue(this.route.snapshot.paramMap.get('id'));
    const res=await this.restriccionService.editRestriccion(this.idRestriccion,this.fb.value);
    if(res){
      const modal = document.getElementById("createRestriccionModal");
      this.editRes=false;
      this.idRestriccion=-1;
      modal!.style.display = "none";
      this.load();
    } 
  }else{
    this.errorMessage="Complete los campos vacios"
  }
}
errorMessage: any="";
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
  editRes: boolean=false;
  async deleteRestriccion(arg0: any) {
  await this.restriccionService.deleteRestriccion(arg0);
  this.showBorrarModal=false;
  this.load();
}
closeDelete() {
  this.idRestriccion=-1;
  this.showBorrarModal=false;
}
showBorrarModal: any=false;
idRestriccion:any;
eliminarRestriccion(arg0: any) {
  this.idRestriccion=arg0;
  this.showBorrarModal=true;
}
editarRestriccion(arg0: any) {
  this.editRes=true;
  this.idRestriccion=arg0.idRestriccion;
  this.fb=this.formService.getRestrictionForm(arg0)
  this.showModal();
}
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'fechaCreacion', name: 'Día' },
    { prop: 'cantidad', name: 'Cantidad' },
    { prop: 'fechaCreacion', name: 'Detalles' }
  ];
    columns2=[
      { prop: 'idRestriccion', name: 'ID comprobacion' },
      { prop: 'objeto', name: 'Objeto a comprobar' },
      { prop: 'fechaDesde', name: 'Desde' },
      { prop: 'fechaHasta', name: 'Hasta' },
      { prop: 'cumplida', name: 'Checkeada' },
      { prop: 'cumplida', name: 'Información' },
      { prop: 'borrar', name: 'Borrar'},
      { prop: 'cumplida', name:'Editar'}
      
      
    ];
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.detecciones.filter(function (d: { fechaCreacion: string; cantidad: { toString: () => string; }; }) {
      return d.fechaCreacion.toLowerCase().indexOf(val) !== -1 ||
             d.cantidad.toString().toLowerCase().indexOf(val) !== -1 ||
             false;
    });
    

    // update the rows
    this.filteredDetecciones = temp;
  }
  updateFilter2(event: any) {
    const val = event.target.value.toLowerCase();
  
    // filter our data
    const temp = this.restricciones.filter((d: any) => {
      return d.idRestriccion.toString().toLowerCase().indexOf(val) !== -1 ||
             d.objeto.toLowerCase().indexOf(val) !== -1 ||
             this.formatDate(d.fechaDesde).indexOf(val) !== -1 ||
             this.formatDate(d.fechaHasta).indexOf(val) !== -1 ||
             false;
    });
  
    // update the rows
    this.filteredRestricciones = temp;
  }
  
  // Helper method to format date
  private formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }
  navigateToFallo(arg0: any) {
    this.proyectoId;
    this.router.navigate([`proyecto/${this.proyectoId}/fallos/`+arg0]);}

  navigateToDetect() {
    const currentUrl = this.router.url;
    this.router.navigate([`${currentUrl}/detect`]);
  }

      detecciones: any=[]
      filteredDetecciones: any=[]
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
        if(!this.checkErrors(this.fb)){
        this.fb.controls["proyectoId"].setValue(this.route.snapshot.paramMap.get('id'));
        const res=await this.restriccionService.createRestriccion(this.fb.value);
        if(res){
          const modal = document.getElementById("createRestriccionModal");
          modal!.style.display = "none";
          this.load();
        }
      }else{
        this.errorMessage="Complete los campos vacios";
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
          this.filteredDetecciones=this.detecciones;
          
        }
        const res2= await this.projectService.getRestricciones(this.proyectoId);
        if(res2){
          this.restricciones=res2;
          this.filteredRestricciones=this.restricciones;
        }
      }

  }
  export interface Restriccion{
    objeto:string,
      fechaDesde: string,
      fechaHasta: string,
      cantidadMin:number,
      cantidadMax: number,
      proyectoId:number,
      diaria:boolean
  }
  
