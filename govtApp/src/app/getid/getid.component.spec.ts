import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetidComponent } from './getid.component';

describe('GetidComponent', () => {
  let component: GetidComponent;
  let fixture: ComponentFixture<GetidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
