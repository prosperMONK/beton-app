import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SableDetailComponent } from './sable-detail.component';

describe('SableDetailComponent', () => {
  let component: SableDetailComponent;
  let fixture: ComponentFixture<SableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
