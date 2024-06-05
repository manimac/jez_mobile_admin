import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    gas: new FormControl('', Validators.required),
    petrol: new FormControl('', Validators.required),
    electric: new FormControl('', Validators.required),
    diesel: new FormControl('', Validators.required)
  })
  constructor(private http: HttpRequestService) { }

  ngOnInit(): void {
    this.loadData();
  }

  get formControls(){
    return this.formGroup.controls;
  }

  loadData(){
    this.http.get('fuel').subscribe(
      (response: any)=>{
        if(response){
          this.formGroup.patchValue(response);
        }
      },
      (error: any)=>{
        this.http.exceptionHandling(error);
      }
    )
  }

  save(){
    this.http.post('fuel/update', this.formGroup.value).subscribe(
      (response: any)=>{
        this.http.successMessage('Updated');
      },
      (error: any)=>{
        this.http.exceptionHandling(error);
      }
    )
  }

}