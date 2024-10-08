import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormProjectService {
  getRestrictionForm(){
    return this.fb.group({idRestriccion: [null],
      objeto: [""],
      fechaDesde: [null],
      fechaHasta: [null],
      cantidadMin:0,
      cantidadMax:0,
      proyectoId:[null]
    });
  }

  constructor(private fb:FormBuilder) {

  }

  getProjectForm(){
      return this.fb.group({idProyecto: [null],
        nombre: [""],
        minConf:[0],
        user:[""],
        fechaCreacion: [null]
      });
  }
}
