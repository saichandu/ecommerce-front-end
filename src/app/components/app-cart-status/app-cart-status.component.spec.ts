import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCartStatusComponent } from './app-cart-status.component';

describe('AppCartStatusComponent', () => {
  let component: AppCartStatusComponent;
  let fixture: ComponentFixture<AppCartStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCartStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCartStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
