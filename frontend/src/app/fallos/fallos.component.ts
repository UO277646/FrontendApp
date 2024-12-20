import { Component, inject } from '@angular/core';
import { FallosService } from '../services/fallos/fallos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fallos',
  standalone: true,
  imports: [],
  templateUrl: './fallos.component.html',
  styleUrl: './fallos.component.css'
})
export class FallosComponent {
  navigateToParent() {
    const currentUrl = this.router.url;
    const parentUrl = currentUrl.replace(/\/fallos\/.*$/, '');
    this.router.navigate([parentUrl+"/restrict"]);
  }
  async deleteFallo(arg0: any) {
    await this.fallosService.deleteFallo(arg0);
    this.loadFallos();

}
  constructor(private route: ActivatedRoute,private router: Router){

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
