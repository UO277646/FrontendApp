import { RouterModule, Routes } from '@angular/router';
import { ProyectosPagComponent } from './proyectos/proyectos-pag/proyectos-pag.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:"",component:ProyectosPagComponent},
    //{path:"detect",component:ProyectosPagComponent}

    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}