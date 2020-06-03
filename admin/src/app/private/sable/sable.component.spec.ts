import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SableComponent } from './sable.component';

describe('SableComponent', () => {
  let component: SableComponent;
  let fixture: ComponentFixture<SableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
