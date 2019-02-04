import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedtreeComponent } from './nestedtree.component';

describe('NestedtreeComponent', () => {
  let component: NestedtreeComponent;
  let fixture: ComponentFixture<NestedtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
