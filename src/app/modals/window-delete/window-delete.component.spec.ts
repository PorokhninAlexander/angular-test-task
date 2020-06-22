import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDeleteComponent } from './window-delete.component';

describe('WindowDeleteComponent', () => {
  let component: WindowDeleteComponent;
  let fixture: ComponentFixture<WindowDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
