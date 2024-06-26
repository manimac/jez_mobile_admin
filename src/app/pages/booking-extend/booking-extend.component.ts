import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-booking-extend',
  templateUrl: './booking-extend.component.html',
  styleUrls: ['./booking-extend.component.css']
})
export class BookingExtendComponent implements OnInit {

  checkinDate: any = '';
  checkintime: any = '';
  checkoutDate: any = '';
  checkouttime: any = '';
  minDate: any = '';
  orderHistoryId: any = '';
  orderData: any;
  loaded: boolean = false;
  showPopup: boolean = false;
  productLists: any = [];
  notAvailableLists: any = [];
  slots = ['0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45']
  constructor(private http: HttpRequestService, private el: ElementRef, private renderer: Renderer2) {
    var today: any = new Date();
    var dd: any = today.getDate();
    var mm: any = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    this.minDate = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit(): void {
    this.loadData();
  }

  changeCheckin() {
    this.orderData.checkouttime = '';
  }

  loadData() {
    this.http.post('productsnofilter', {}).subscribe(
      (response: any) => {
        this.productLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  findOrders() {
    this.orderData = null;
    this.loaded = false;
    if (!this.orderHistoryId) {
      this.http.errorMessage("Please enter order id");
    }
    else {
      this.http.post('order-history/find', { id: this.orderHistoryId }).subscribe(
        (response: any) => {
          console.log(response)
          if (response) {
            this.orderData = response;
            if (this.orderData) {
              let checkindate = this.orderData.checkindate.split(" ");
              this.orderData.checkindate = checkindate[0]
              let checkoutdate = this.orderData.checkoutdate.split(" ");
              this.orderData.checkoutdate = checkoutdate[0]
              let checkintime: any = this.orderData.checkintime.split(":");
              if (checkintime.length > 1) {
                this.orderData.checkintime = checkintime[0] + ":" + checkintime[1];
                if (this.orderData.checkintime.startsWith('0')) {
                  this.orderData.checkintime = this.orderData.checkintime.slice(1);
                }
              }
              let checkouttime: any = this.orderData.checkouttime.split(":");
              if (checkouttime.length > 1) {
                this.orderData.checkouttime = checkouttime[0] + ":" + checkouttime[1];
                if (this.orderData.checkouttime.startsWith('0')) {
                  this.orderData.checkouttime = this.orderData.checkouttime.slice(1);
                }
              }
              console.log(this.orderData)
            }
          }
          else {
            this.http.errorMessage("We don't have any order")
          }
          this.loaded = true;
        }, (error: any) => {
          this.http.exceptionHandling(error)
        });
    }
  }

  checkAvailability(bool: Boolean) {
    this.showPopup = false;
    if (this.orderData) {
      let splitcheckin = this.orderData.checkindate.split(' ')
      let splitcheckout = this.orderData.checkoutdate.split(' ')
      let checkinDate = splitcheckin[0].split('-').reverse().join('-');
      let checkoutDate = splitcheckout[0].split('-').reverse().join('-');
      let obj = {
        "product_id": this.orderData.product_id,
        "type": 'Rent',
        "location": "",
        "locationid": null,
        "checkindate": checkinDate,
        "checkoutdate": checkoutDate,
        "checkintime": this.orderData.checkintime,
        "checkouttime": this.orderData.checkouttime
      }
      this.http.post('order/get-available-products', obj).subscribe(
        (response: any) => {
          if (response && Array.isArray(response) && (response.length > 0)) {
            response = response.filter((element: any) => (element.id != this.orderData.id));
            if (response && Array.isArray(response) && (response.length > 0)) {
              this.notAvailableLists = response;
              if (!bool) {
                this.showPopup = true;
                const modalElement = this.el.nativeElement.querySelector('#updatetrigger');
                modalElement.click();
              }
              else {
                this.http.errorMessage("Please change a products for selected slot");
              }
            }
            else {
              this.updateCurrentOrder()
              // this.http.successMessage("Updated Successfully.");
            }
          }
          else {
            this.updateCurrentOrder()
          }
          console.log(response);
        });
    }

  }

  updateCurrentOrder() {
    let checkinDate = this.orderData.checkindate.split('-').reverse().join('-');
    let checkoutDate = this.orderData.checkoutdate.split('-').reverse().join('-');
    let utcDate = new Date(this.orderData.checkindate + " " + this.orderData.checkouttime);
    let month = utcDate.getUTCMonth() + 1;

    var d = new Date(utcDate.getUTCFullYear() + "-" + month + "-" + utcDate.getUTCDate() + " " + utcDate.getUTCHours() + ":" + utcDate.getUTCMinutes())
    // let maxcheckoutdateutc = [d.getMonth() + 1,
    // d.getDate(),
    // d.getFullYear()].join('-') + ' ' +
    //   [d.getHours(),
    //   d.getMinutes()].join(':');
      let maxcheckoutdateutc = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes()].join(':');
      let params = {
        id: this.orderData.id,
        checkoutdate: checkoutDate,
        checkouttime: this.orderData.checkouttime,
        maxcheckoutdateutc: maxcheckoutdateutc
      }
      this.http.post('order-history/updateorder', params).subscribe(
        (order: any) => {
          this.http.successMessage("Updated Successfully.");
          const modalElement = this.el.nativeElement.querySelector('#closepopup');
          modalElement.click();
          this.findOrders();
        });
  }


  checkAvailabilityOrder(order: any) {
    let splitcheckin = order.checkindate.split(' ')
    let splitcheckout = order.checkoutdate.split(' ')
    let checkinDate = splitcheckin[0].split('-').reverse().join('-');
    let checkoutDate = splitcheckout[0].split('-').reverse().join('-');
    let obj = {
      "product_id": order.product_id,
      "type": 'Rent',
      "location": "",
      "locationid": null,
      "checkindate": checkinDate,
      "checkoutdate": checkoutDate,
      "checkintime": order.checkintime,
      "checkouttime": order.checkouttime
    }
    this.http.post('order/availability', obj).subscribe(
      (response: any) => {
        if (!response.booked || (response.booked == false)) {
          let findProduct = this.productLists.find((element: any) => (element.id == order.product_id))
          if (findProduct) {
            let params = {
              id: order.id,
              product_id: order.product_id,
              name: findProduct.name
            }
            this.http.post('order-history/update', params).subscribe(
              (order: any) => {
                // this.checkAvailability();
                this.http.successMessage("Updated Successfully.");
                // this.findOrders();
              });
          }
          else {
            this.http.errorMessage("We don't have availability for this slot. Please select a different slot.")
          }
        }
        else {
          this.http.errorMessage("We don't have availability for this slot. Please select a different slot.")
        }
      });
  }


  checkinDisabled(slot: any) {
    let result = false;
    if (this.orderData.checkinModifieddate) {
      let date = new Date();
      let currentHours = date.getHours();
      let currentMinutes = date.getMinutes();
      let splitSlot = slot.split(":");
      let slotHours = splitSlot[0];
      let slotMinutes = splitSlot[1];
      let todayDate = new Date().toISOString().split('T')[0];
      // let updatedCurrentDate: any = todayDate.split("-");
      // updatedCurrentDate = updatedCurrentDate.reverse().join('-');
      if ((this.orderData.checkinModifieddate == todayDate) && (currentHours > slotHours)) {
        result = true;
      }
      else if ((this.orderData.checkinModifieddate == todayDate) && (currentHours == slotHours) && (currentMinutes >= slotMinutes)) {
        result = true;
      }
    }

    return result;
  }

  checkoutDisabled(slot: any) {
    let result = false;
    let checkintimeIndex = this.slots.indexOf(this.orderData.checkintime);
    let checkouttimeIndex = this.slots.indexOf(slot);
    if ((this.orderData.checkinModifieddate == this.orderData.checkoutModifieddate) && (checkintimeIndex >= checkouttimeIndex)) {
      result = true;
    }
    if (this.orderData.checkoutModifieddate) {
      let date = new Date();
      let currentHours = date.getHours();
      let currentMinutes = date.getMinutes();
      let splitSlot = slot.split(":");
      let slotHours = splitSlot[0];
      let slotMinutes = splitSlot[1];
      let todayDate = new Date().toISOString().split('T')[0];
      if ((this.orderData.checkoutModifieddate == todayDate) && (currentHours >= slotHours) && (currentMinutes >= slotMinutes)) {
        result = true;
      }
    }
    return result;
  }

  setCheckoutDate() {
    this.orderData.checkoutModifieddate = this.orderData.checkinModifieddate;
    this.orderData.checkintime = '';
    this.orderData.checkouttime = '';
  }

  changeVehicle(){
    let splitcheckin = this.orderData.checkindate.split(' ')
    let splitcheckout = this.orderData.checkoutdate.split(' ')
    let checkinDate = splitcheckin[0].split('-').reverse().join('-');
    let checkoutDate = splitcheckout[0].split('-').reverse().join('-');
    let obj = {
      "product_id": this.orderData.product_id,
      "type": 'Rent',
      "location": "",
      "locationid": null,
      "checkindate": checkinDate,
      "checkoutdate": checkoutDate,
      "checkintime": this.orderData.checkintime,
      "checkouttime": this.orderData.checkouttime
    }
    this.http.post('order/availability', obj).subscribe(
      (response: any) => {
        if (!response.booked || (response.booked == false)) {
          let findProduct = this.productLists.find((element: any) => (element.id == this.orderData.product_id))
          if (findProduct) {
            let params = {
              id: this.orderData.id,
              product_id: this.orderData.product_id,
              name: findProduct.name
            }
            this.http.post('order-history/update', params).subscribe(
              (order: any) => {
                this.http.successMessage("Updated Successfully.");
                this.findOrders();
              });
          }
          else {
            this.http.errorMessage("We don't have availability for this slot. Please select a different slot.")
          }
        }
        else {
          this.http.errorMessage("We don't have availability for this slot. Please select a different slot.")
        }
      });
  }

}
