import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowAddComponent } from './window-add.component';

describe('WindowAddComponent', () => {
  let component: WindowAddComponent;
  let fixture: ComponentFixture<WindowAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
