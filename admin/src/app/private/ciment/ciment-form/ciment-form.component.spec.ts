import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimentFormComponent } from './ciment-form.component';

describe('CimentFormComponent', () => {
  let component: CimentFormComponent;
  let fixture: ComponentFixture<CimentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
