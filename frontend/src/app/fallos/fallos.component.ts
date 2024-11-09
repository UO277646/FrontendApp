import { Component, inject } from '@angular/core';
import { FallosService } from '../services/fallos/fallos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fallos',
  standalone: true,
  imports: [],
  templateUrl: './fallos.component.html',
  styleUrl: './fallos.component.css'
})
export class FallosComponent {
  async deleteFallo(arg0: any) {
    await this.fallosService.deleteFallo(arg0);
    this.loadFallos();

}
  constructor(private route: ActivatedRoute){

  }
fallos: any;
idRec:any;
fallosService=inject(FallosService)
async ngOnInit() {
  try {
    this.idRec= this.route.snapshot.paramMap.get('idRec')
    this.loadFallos();
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
  }
}
  async loadFallos() {
    const res= await this.fallosService.getFallos(this.idRec);
    if(res){
      this.fallos=res;
    }
  }
}
