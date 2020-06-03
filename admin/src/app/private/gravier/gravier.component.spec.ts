import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravierComponent } from './gravier.component';

describe('GravierComponent', () => {
  let component: GravierComponent;
  let fixture: ComponentFixture<GravierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GravierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
