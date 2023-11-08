import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  showSuccess: boolean=false;
  // paypal variable
  public payPalConfig?: IPayPalConfig;

  showBilling:boolean=false;
  showLogin:boolean=true;
  showSignup:boolean=false;

  signUpResponse:string=''
  signUpMessage:boolean=false;

  loginResponse:string=''
  loginMessage:boolean=false;

  viewRoomData:any={}

  emailid:string=''

  formData:any={}

  paymentMethod:string='';
  showPaypal: boolean =false;

  constructor(private shared:SharedService, private api:ApiService, private formBuild:FormBuilder, private router:Router){}
  ngOnInit(): void {
    this.viewRoomData=this.shared.getconfRate()
    console.log(this.viewRoomData);
    this.initConfig();
  }


  loginBody(){
    this.showLogin=true;
    this.showSignup=false;
  }
  signupBody(){
    this.showLogin=false;
    this.showSignup=true;
  }

  signupForm = this.formBuild.group({
    username:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.minLength(8),Validators.required]]
  })

  submitSignup(){
    if (this.signupForm.valid) {
      let username = this.signupForm.value.username;
      let email = this.signupForm.value.email;
      let password = this.signupForm.value.password;
      // console.log(username,email,password);

      this.api.userSignup(username,email,password).subscribe((response:any)=>{
        console.log(response);
        this.signUpResponse=response;
        this.signUpMessage=true;
        setTimeout(()=>{
          this.showLogin=true;
        this.showSignup=false;
        this.signUpMessage=false;
        },3000)
      },
      (response:any)=>{
        this.signUpResponse=response.error.message;
        console.log(this.signUpResponse);
        this.signUpMessage=true;
        setTimeout(()=>{
        this.signUpMessage=false;
        this.signupForm.reset()
        },3000)
      })
    }
    else{
      alert("Please enter valid details.")
    }
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
        this.showBilling=true;
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

  dataForm = this.formBuild.group({
    firstname:[''],
    lastname:[''],
    phone:[''],
    company:[''],
    address:[''],
    country:[''],
    state:[''],
    district:[''],
    postalcode:[''],
    ordernotes:['']
  })

  cardPayment(){
    this.showPaypal=true;
  }

  payMeth(value: any){
    console.log(value)
    this.paymentMethod=value;
    this.showPaypal=false;
  }

  // Paypal
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  // Checkout form submit function
  submitDataform(){
    if (this.dataForm.valid) {
      this.formData.firstName=this.dataForm.value.firstname;
      this.formData.lastName=this.dataForm.value.lastname;
      this.formData.emailId=this.emailid;
      this.formData.phone=this.dataForm.value.phone;
      this.formData.company=this.dataForm.value.company;
      this.formData.address=this.dataForm.value.address;
      this.formData.country=this.dataForm.value.country;
      this.formData.state=this.dataForm.value.state;
      this.formData.district=this.dataForm.value.district;
      this.formData.postalCode=this.dataForm.value.postalcode;
      this.formData.orderNotes=this.dataForm.value.ordernotes;
      this.formData.roomType=this.viewRoomData.roomTitle;
      this.formData.checkIn=this.viewRoomData.checkIn;
      this.formData.checkOut=this.viewRoomData.checkOut;
      this.formData.guests=this.viewRoomData.guests;
      this.formData.roomClean=this.viewRoomData.nightClean;
      this.formData.massageCount=this.viewRoomData.massageCount;
      this.formData.spaCount=this.viewRoomData.daySpaCount;
      this.formData.totalAmt=this.viewRoomData.totalAmount;
      this.formData.payMethod=this.paymentMethod;
      console.log(this.formData);
      this.api.addBookings(this.formData).subscribe((response:any)=>{
        console.log(response);
        alert(response)
        this.router.navigateByUrl('');
      })

    } else {
      alert("Enter details")
    }
  }
}
