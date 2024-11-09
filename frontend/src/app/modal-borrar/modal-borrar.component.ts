import { Component, EventEmitter, Input, input, Output  } from '@angular/core';

@Component({
  selector: 'app-modal-borrar',
  standalone: true,
  imports: [],
  templateUrl: './modal-borrar.component.html',
  styleUrl: './modal-borrar.component.css'
})
export class ModalBorrarComponent {
  displayModal: string = 'none';
  @Input() idProyecto: number | undefined;
  @Output() delete = new EventEmitter<void>();
  openModal() {
    this.displayModal = 'block';
  }

  closeModal() {
    this.displayModal = 'none';
  }

  deleteItem() {
    this.delete.emit();
    this.closeModal()
  }

}
