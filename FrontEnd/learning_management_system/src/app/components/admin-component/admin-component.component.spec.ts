import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponentComponent } from './admin-component.component';

describe('AdminComponentComponent', () => {
  let component: AdminComponentComponent;
  let fixture: ComponentFixture<AdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
