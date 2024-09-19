import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormProjectService {

  constructor(private fb:FormBuilder) {

   }

  getProjectForm(){
      return this.fb.group({idProyecto: [null],
        nombre: [""],
        fechaCreacion: [null]
      });
  }
}
