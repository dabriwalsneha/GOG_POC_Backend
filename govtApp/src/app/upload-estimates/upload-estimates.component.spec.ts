import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEstimatesComponent } from './upload-estimates.component';

describe('UploadEstimatesComponent', () => {
  let component: UploadEstimatesComponent;
  let fixture: ComponentFixture<UploadEstimatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEstimatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEstimatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
