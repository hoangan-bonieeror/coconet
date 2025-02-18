import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorConstructionComponent } from './interior.construction.component';

describe('InteriorConstructionComponent', () => {
  let component: InteriorConstructionComponent;
  let fixture: ComponentFixture<InteriorConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteriorConstructionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteriorConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
