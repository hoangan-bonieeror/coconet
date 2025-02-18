import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalDesignComponent } from './architectural.design.component';

describe('ArchitecturalDesignComponent', () => {
  let component: ArchitecturalDesignComponent;
  let fixture: ComponentFixture<ArchitecturalDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitecturalDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitecturalDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
