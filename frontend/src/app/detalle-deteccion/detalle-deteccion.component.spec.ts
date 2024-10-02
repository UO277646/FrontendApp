import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDeteccionComponent } from './detalle-deteccion.component';

describe('DetalleDeteccionComponent', () => {
  let component: DetalleDeteccionComponent;
  let fixture: ComponentFixture<DetalleDeteccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDeteccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleDeteccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
