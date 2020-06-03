import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimentComponent } from './ciment.component';

describe('CimentComponent', () => {
  let component: CimentComponent;
  let fixture: ComponentFixture<CimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
