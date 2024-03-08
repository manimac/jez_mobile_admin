import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingExtendComponent } from './booking-extend.component';

describe('BookingExtendComponent', () => {
  let component: BookingExtendComponent;
  let fixture: ComponentFixture<BookingExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingExtendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
