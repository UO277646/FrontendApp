import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosPagComponent } from './proyectos-pag.component';

describe('ProyectosPagComponent', () => {
  let component: ProyectosPagComponent;
  let fixture: ComponentFixture<ProyectosPagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosPagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyectosPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
