import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorDesginComponent } from './interior.desgin.component';

describe('InteriorDesginComponent', () => {
  let component: InteriorDesginComponent;
  let fixture: ComponentFixture<InteriorDesginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteriorDesginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteriorDesginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
