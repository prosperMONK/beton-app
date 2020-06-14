import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SableFormComponent } from './sable-form.component';

describe('SableFormComponent', () => {
  let component: SableFormComponent;
  let fixture: ComponentFixture<SableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
