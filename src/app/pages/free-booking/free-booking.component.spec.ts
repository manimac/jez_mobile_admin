import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeBookingComponent } from './free-booking.component';

describe('FreeBookingComponent', () => {
  let component: FreeBookingComponent;
  let fixture: ComponentFixture<FreeBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
