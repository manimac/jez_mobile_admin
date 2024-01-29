import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  navigations: any = [];
  userDetails: any = {};
  userunread: any = 0;
  orderunread: any = 0;
  withdrawunread: any = 0;
  constructor(private storage: StorageService, private http: HttpRequestService) { 
    this.userDetails = this.storage.getUserDetails();
    this.loadNavigations();
    if(this.userDetails){
      // this.loadOrderData();
      // this.loadUserData();
      // this.loadWithdrawData();
    }    
  }

  ngOnInit(): void {
    this.http.updateOrder.subscribe((response: any)=>{
      // this.loadOrderData();
    })
    this.http.updateUser.subscribe((response: any)=>{
      // this.loadUserData();
    })
    this.http.updateWithdraw.subscribe((response: any)=>{
      // this.loadWithdrawData();
    })
  }

  loadUserData() {
    this.http.get('user/getunReadUsers').subscribe(
      (response: any) => {
        if (response) {
          this.userunread = response.count;
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  loadOrderData() {    
    this.http.get('order/getunReadOrders').subscribe(
      (response: any) => {
        if (response) {
          this.orderunread = response.count;
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  loadWithdrawData() {    
    this.http.get('getunReadWithdraw').subscribe(
      (response: any) => {
        if (response) {
          this.withdrawunread = response.count;
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  loadNavigations(){
    if (this.storage.isAdmin()){
      this.navigations = [
        {
          label: 'Services',
          route: '/services',
          icon: 'mdi-truck'
        },
        {
          label: 'Specifications',
          route: '/specifications',
          icon: 'mdi-truck'
        },
        {
          label: 'Filter Options',
          route: '/filter-options',
          icon: 'mdi-filter'
        },
        {
          label: 'Extras',
          route: '/extras',
          icon: 'mdi-truck'
        },
        {
          label: 'Staffing Categories',
          route: '/categories',
          icon: 'mdi-filter'
        },
        {
          label: 'Employers',
          route: '/employers',
          icon: 'mdi-filter'
        },
        // {
        //   label: 'Peek Hours',
        //   route: '/peek-hours',
        //   icon: 'mdi-clock'
        // },
        {
          label: 'About us',
          route: '/about-us',
          icon: 'mdi-information'
        },
        {
          label: 'Contact us',
          route: '/contact-us',
          icon: 'mdi-account-box'
        },
        {
          label: 'Faq',
          route: '/faq',
          icon: 'mdi-frequently-asked-questions'
        },
        {
          label: 'Locations',
          route: '/locations',
          icon: 'mdi-map-marker-multiple'
        },
        {
          label: 'Pickup Locations',
          route: '/pickup-location',
          icon: 'mdi-map-marker-multiple'
        },
        {
          label: 'Enquiries',
          route: '/enquiries',
          icon: 'mdi-account'
        },
        {
          label: 'Order Histories',
          route: '/order-histories',
          icon: 'mdi-cart'
        },
        {
          label: 'Terms And Conditions',
          route: '/terms-and-conditions',
          icon: 'mdi-cart'
        },
        {
          label: 'Staffs',
          route: '/staffs',
          icon: 'mdi-account-multiple'
        },
        {
          label: 'Users',
          route: '/users',
          icon: 'mdi-account-group'
        },
        {
          label: 'Withdraw Requests',
          route: '/withdraw-request',
          icon: 'mdi-cart'
        },
        {
          label: 'Maintenance',
          route: '/maintenance',
          icon: 'mdi-cart'
        },
        {
          label: 'Free Booking',
          route: '/free-booking',
          icon: 'mdi-cart'
        },
        {
          label: 'Coupons',
          route: '/coupons',
          icon: 'mdi-cart'
        },
        {
          label: 'Advertisements',
          route: '/advertisement',
          icon: 'mdi-cart'
        },
        {
          label: 'Certificates',
          route: '/certificates',
          icon: 'mdi-information'
        }
      ];
    }
    else{
      this.navigations = [
        {
          label: 'Services',
          route: '/services',
          icon: 'mdi-truck'
        }
      ];
    }
  }

}
