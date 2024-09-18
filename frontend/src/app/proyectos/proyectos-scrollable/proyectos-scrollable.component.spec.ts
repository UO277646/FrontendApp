import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosScrollableComponent } from './proyectos-scrollable.component';

describe('ProyectosScrollableComponent', () => {
  let component: ProyectosScrollableComponent;
  let fixture: ComponentFixture<ProyectosScrollableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosScrollableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyectosScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
