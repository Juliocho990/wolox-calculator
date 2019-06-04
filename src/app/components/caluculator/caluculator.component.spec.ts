import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaluculatorComponent } from './caluculator.component';

describe('CaluculatorComponent', () => {
  let component: CaluculatorComponent;
  let fixture: ComponentFixture<CaluculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaluculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaluculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
