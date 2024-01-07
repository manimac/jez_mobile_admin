import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    companylogo: new FormControl('', Validators.required),
    coverphoto: new FormControl(''),
    companyname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    description: new FormControl(''),
    website: new FormControl('', Validators.required),
    kvk: new FormControl(''),
    btw: new FormControl(''),
    path: new FormControl(''),
    status: new FormControl('')
  })
  showForm: boolean = false;
  dataLists: any = [];
  rolesLists: any = ['Admin', 'All', 'Rent', 'Staffing', 'Transport', 'Rent & Staffing', 'Rent & Transport', 'Staffing & Transport'];
  constructor(private http: HttpRequestService) { }

  ngOnInit(): void {
    this.loadData();
  }

  get formControls(){
    return this.formGroup.controls;
  }

  loadData(){
    this.http.post('employer/listEmployer' ,{is_admin: 1}).subscribe(
      (response: any)=>{
        if(response){
          this.dataLists = response;
        }        
      },
      (error: any)=>{
        this.http.exceptionHandling(error);
      }
    )
  }

  updateStatus(id: number, user: any, event: any){
    let params = {
      status: event.target.checked ? 1 : 0,
      id: user.id
    }
    this.http.post('employer/updateEmployerStatus' ,params).subscribe(
      (response: any)=>{
        // this.loadData();       
      },
      (error: any)=>{
        this.http.exceptionHandling(error);
      }
    )
  }

  create(element: HTMLElement){
    element.scrollIntoView()
    this.showForm = true;
  }

  viewElement(params: any, element: HTMLElement){
    this.showForm = true;
    this.formGroup.patchValue(params);
    element.scrollIntoView()
  }

  save(){
    let params = {
      status: this.formGroup.value.status,
      id: this.formGroup.value.id
    }
    this.http.post('employer/updateEmployerStatus' ,params).subscribe(
      (response: any)=>{
        this.http.successMessage("Employer Updated Successfully");    
          this.showForm = false;
          this.formGroup.reset();
          this.loadData();
      },
      (error: any)=>{
        this.http.exceptionHandling(error);
      }
    )   
  }
  
  cancel(){
    this.showForm = false;
    this.formGroup.reset();
  }

}
