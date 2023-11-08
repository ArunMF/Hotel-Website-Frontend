import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{
  showLogin:boolean=true
  showTable:boolean=false

  loginResponse:string=''
  loginMessage:boolean=false;

  allBookings: any=[];
  constructor(private api:ApiService, private fb:FormBuilder){}
  ngOnInit(): void {
    this.api.getAllBookings().subscribe((data:any)=>{
      this.allBookings = data;
      console.log(this.allBookings);
      
    })
  }

  adminForm = this.fb.group({
    email:[''],
    password:['']
  })

  adminLogin(){
    if (this.adminForm.valid) {
      let email = this.adminForm.value.email || '';
      let password = this.adminForm.value.password || '';
      // console.log(email,password);

      this.api.adminLogin(email,password).subscribe((response:any)=>{
        console.log(response);
        this.loginResponse=response;
        this.loginMessage=true
        setTimeout(()=>{
          this.showLogin=false;
        this.showTable=true;
        this.loginMessage=false;
        },3000)
      },
      (response:any)=>{
        this.loginResponse=response.error.message;
        this.loginMessage=true
        setTimeout(()=>{
        this.adminForm.reset();
        this.loginMessage=false;
        },3000)
      })
    }
    else{
      alert("Enter email id and password.")
    }
  }
}
