import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private baseUrl = environment.baseurl;
  updateOrder: any = new EventEmitter();
  updateUser: any = new EventEmitter();
  updateWithdraw: any = new EventEmitter();
  
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  setHeaders() {
    return ({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': localStorage.getItem('jwtToken') || '' });
  }

  get(url: any) {
    const headers = this.setHeaders();
    return this.http.get(this.baseUrl + url, { headers });
  }

  getGoogleAddress(lat: any, long: any) {
    const headers = this.setHeaders();
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +"," +long + "&sensor=true&key=AIzaSyDRzC2926nlZ0VOWTn9QbHrfbBCDtj8IR8");
  }

  post(url: any, body: any) {
    const headers = this.setHeaders();
    return this.http.post(this.baseUrl + url, body, { headers });
  }

  postAuth(url: any, body: any) {
    const headers = this.setHeaders();
    return this.http.post(environment.authurl + url, body, { headers });
  }

  delete(url: any, id: any) {
    const headers = this.setHeaders();
    return this.http.delete(this.baseUrl + url + id, { headers });
  }

  successMessage(message: any){
    this.toastr.success(message);
  }

  errorMessage(message: any){
    this.toastr.error(message);
    (message);
  }

  exceptionHandling(error: any){
    if(error && error.error && error.error.message){
      this.toastr.error(error.error.message);
    }
    else if(error && error.error){
      this.toastr.error(error.error);
    }
    else{
      this.toastr.error("Request Failed");
    }
  }


}
