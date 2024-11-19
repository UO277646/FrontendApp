import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { ProyectosScrollableComponent } from "../proyectos-scrollable/proyectos-scrollable.component";

@Component({
  selector: 'app-proyectos-pag',
  standalone: true,
  imports: [ ProyectosScrollableComponent],
  templateUrl: './proyectos-pag.component.html',
  styleUrl: './proyectos-pag.component.css'
})
export class ProyectosPagComponent {

}
