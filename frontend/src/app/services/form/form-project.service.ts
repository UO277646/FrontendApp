import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Proyecto } from '../../proyectos/proyectos-scrollable/proyectos-scrollable.component';
import { Restriccion } from '../../detalle-proyectos/detalle-proyectos.component';

@Injectable({
  providedIn: 'root'
})
export class FormProjectService {
  getRestrictionForm(restriccion?:Restriccion){
    return this.fb.group({idRestriccion: [null],
      objeto: [restriccion?.objeto ? restriccion.objeto :"",Validators.required],
      fechaDesde: [restriccion?.fechaDesde ? restriccion.fechaDesde : null,Validators.required],
      fechaHasta: [restriccion?.fechaHasta ? restriccion.fechaHasta : null,Validators.required],
      cantidadMin: [restriccion?.cantidadMin ? restriccion.cantidadMin : '', [Validators.required, Validators.min(0)]],
      cantidadMax: [restriccion?.cantidadMax ? restriccion.cantidadMax : '', [Validators.required,Validators.min(restriccion?.cantidadMin ? restriccion.cantidadMin : 0)]],
      proyectoId:[restriccion?.proyectoId ? restriccion.proyectoId :null],
      diaria:[restriccion?.diaria ? restriccion.diaria :false]
    },{ validators: [this.maxMayorQueMin, this.fechaInicialMenorQueFinal] });
  }
  maxMayorQueMin(control: AbstractControl): ValidationErrors | null {
    const min = control.get('cantidadMin')?.value;
    const max = control.get('cantidadMax')?.value;
    return min !== null && max !== null && min > max ? { 'maxMenorQueMin': true } : null;
  }
  fechaInicialMenorQueFinal(control: AbstractControl): ValidationErrors | null {
    const fechaDesde = control.get('fechaDesde')?.value;
    const fechaHasta = control.get('fechaHasta')?.value;
    if (fechaDesde && fechaHasta) {
      return new Date(fechaDesde) >= new Date(fechaHasta) ? { 'fechasInvalidas': true } : null;
    }
    return null;
  }
  constructor(private fb:FormBuilder) {

  }

  getProjectForm(proyecto?:Proyecto){
      return this.fb.group({idProyecto: [null],
        proyectId:[proyecto?.proyectId ? proyecto?.proyectId : null],
        nombre: [proyecto?.nombre ? proyecto?.nombre : "",Validators.required],
        minConf:[proyecto?.minConf ? proyecto?.minConf :0.7,Validators.required],
        user:[proyecto?.user ? proyecto?.user :""],
        fechaCreacion: [proyecto?.fechaCreacion ? proyecto?.fechaCreacion :""]
      });
  }
}
