import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-modal-borrar',
  standalone: true,
  imports: [],
  templateUrl: './modal-borrar.component.html',
  styleUrl: './modal-borrar.component.css'
})
export class ModalBorrarComponent {
   @Input() funcionBorrar :any;

borrar() {
  this.funcionBorrar;
}
closeModal() {
  
}

}
