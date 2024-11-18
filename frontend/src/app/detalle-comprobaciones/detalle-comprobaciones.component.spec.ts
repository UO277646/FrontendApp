import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComprobacionesComponent } from './detalle-comprobaciones.component';

describe('DetalleComprobacionesComponent', () => {
  let component: DetalleComprobacionesComponent;
  let fixture: ComponentFixture<DetalleComprobacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleComprobacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleComprobacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
