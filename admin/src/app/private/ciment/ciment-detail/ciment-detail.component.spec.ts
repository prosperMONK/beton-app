import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimentDetailComponent } from './ciment-detail.component';

describe('CimentDetailComponent', () => {
  let component: CimentDetailComponent;
  let fixture: ComponentFixture<CimentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
