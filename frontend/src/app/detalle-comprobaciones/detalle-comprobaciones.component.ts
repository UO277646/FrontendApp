import { Component, inject, ViewChild } from '@angular/core';
import { ProjectService } from '../services/projectsServices/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProjectService } from '../services/form/form-project.service';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestriccionService } from '../services/restricciones/restriccion.service';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-comprobaciones',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,NgxDatatableModule],
  templateUrl: './detalle-comprobaciones.component.html',
  styleUrl: './detalle-comprobaciones.component.css'
})
export class DetalleComprobacionesComponent {
navigateToParent() {
  const currentUrl = this.router.url;
  const parentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
  this.router.navigate([parentUrl]);
}
  filteredRestricciones: any;
  async edit() {
  if(!this.checkErrors(this.fb) && this.fb.valid){
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
    this.errorMessage="Algun campo vacio o erroneo"
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
  console.log(this.idRestriccion);
  console.log(this.showBorrarModal);

}
editarRestriccion(arg0: any) {
  this.editRes=true;
  this.idRestriccion=arg0.idRestriccion;
  this.fb=this.formService.getRestrictionForm(arg0)
  this.showModal();
}
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;
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
        this.editRes=false;
        this.fb=this.formService.getRestrictionForm()
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
        this.errorMessage="Algun campo vacio o erroneo";
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
        const res2= await this.projectService.getRestricciones(this.proyectoId);
        if(res2){
          this.restricciones=res2;
          this.filteredRestricciones=this.restricciones;
        }
      }
}
