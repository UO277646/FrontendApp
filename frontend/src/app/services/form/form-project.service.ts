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
      cantidad:0,
      idProyecto:[null]
    });
  }

  constructor(private fb:FormBuilder) {

  }

  getProjectForm(){
      return this.fb.group({idProyecto: [null],
        nombre: [""],
        fechaCreacion: [null]
      });
  }
}
