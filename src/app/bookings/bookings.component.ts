import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit{
  allBookings: any=[]

  showTable:boolean=false;
  showLogin:boolean=true;

  loginResponse:string=''
  loginMessage:boolean=false;

  emailid:string=''

  constructor(private api:ApiService, private formBuild:FormBuilder){}
  ngOnInit(): void {
    this.api.getAllBookings().subscribe((data:any)=>{
      this.allBookings = data;
      console.log(this.allBookings);
  })
}

loginForm=this.formBuild.group({
  email:['',[Validators.required]],
  password:['',[Validators.required]]
})

submitLogin(){
  if (this.loginForm.valid) {
    let email = this.loginForm.value.email || ''
    let password = this.loginForm.value.password || ''
    // console.log(email,password);

    this.api.userLogin(email,password).subscribe((response:any)=>{
      console.log(response);
      this.loginResponse=response;
      this.emailid=email
      this.loginMessage=true;
      setTimeout(()=>{
        this.showLogin=false;
      this.showTable=true;
      this.loginMessage=false;
      },3000)
    },
    (response:any)=>{
      this.loginResponse=response.error.message;
      console.log(this.loginResponse);
      this.loginMessage=true;
      setTimeout(()=>{
      this.loginMessage=false;
      this.loginForm.reset()
      },3000)
    })
    
  }
  else{
    alert("Please enter email address and password.")
  }
}
}
