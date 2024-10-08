import { RouterModule, Routes } from '@angular/router';
import { ProyectosPagComponent } from './proyectos/proyectos-pag/proyectos-pag.component';
import { NgModule } from '@angular/core';
import { DetalleProyectosComponent } from './detalle-proyectos/detalle-proyectos.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DetalleDeteccionComponent } from './detalle-deteccion/detalle-deteccion.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './guards/loginGuard.guard';
import { FallosComponent } from './fallos/fallos.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"proyectos",component:ProyectosPagComponent,canActivate:[loginGuard]},
    {path:"proyecto/:id",canActivate:[loginGuard],
        children:[
            {path:"",component:DetalleProyectosComponent,canActivate:[loginGuard]},
            {path:"fallos/:idRec",component:FallosComponent,canActivate:[loginGuard]},
            {path:"detect",component:FileUploadComponent,canActivate:[loginGuard]},
            {path:"detections/:fecha",component:DetalleDeteccionComponent,canActivate:[loginGuard]}
        ]
    },
    //{path:"proyecto/:id/detect",component:FileUploadComponent},
    //{path:"detect",component:FileUploadComponent}
    //{path:"detect",component:ProyectosPagComponent}

    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}