import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProyectosComponent } from './detalle-proyectos.component';

describe('DetalleProyectosComponent', () => {
  let component: DetalleProyectosComponent;
  let fixture: ComponentFixture<DetalleProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
