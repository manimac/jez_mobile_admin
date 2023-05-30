import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(params: any) {
    localStorage.setItem('jwtToken', params);
  }

  getToken() {
    let token = localStorage.getItem('jwtToken')
    if (token) {
      token = token;
    }
    return token;
  }

  setUserDetails(params: any) {
    localStorage.setItem('jwtUserDetails', JSON.stringify(params));
  }

  getUserDetails() {
    let userDetails = localStorage.getItem('jwtUserDetails')
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
    }
    return userDetails;
  }

  isAdmin() {
    let result = false;
    let userDetails: any = localStorage.getItem('jwtUserDetails')
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      if (userDetails.role && (userDetails.role == 'Admin')) {
        result = true;
      }
    }
    return result;
  }

  getRole() {
    let result = '';
    let userDetails: any = localStorage.getItem('jwtUserDetails')
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      result = userDetails.role;
    }
    return result;
  }
}
