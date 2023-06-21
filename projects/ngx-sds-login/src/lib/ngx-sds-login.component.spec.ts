import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSdsLoginComponent } from './ngx-sds-login.component';

describe('NgxSdsLoginComponent', () => {
  let component: NgxSdsLoginComponent;
  let fixture: ComponentFixture<NgxSdsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSdsLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSdsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
