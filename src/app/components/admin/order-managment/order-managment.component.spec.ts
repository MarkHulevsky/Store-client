import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagmentComponent } from './order-managment.component';

describe('OrderManagmentComponent', () => {
  let component: OrderManagmentComponent;
  let fixture: ComponentFixture<OrderManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
