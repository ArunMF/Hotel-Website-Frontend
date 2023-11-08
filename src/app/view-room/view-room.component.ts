import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit{
  roomId: string='';
  room: any=[];
  roomImg1:string=''
  roomImg2:string=''
  roomImg3:string=''
  roomImg4:string=''
  roomTitle:string=''
  roomPrice:string=''

  massagePersonCount: any=0;
  daySpaPersonCount: any=0;
  totalAmt:string=''
  checkInDate: string = '';
  checkOutDate: string = '';
  noOfGuest: any = 0;
  nightCleanAmt: number =0;
  massageAmt: number=0;
  daySpaAmt: number=0;
  nightClean: number=0;
  constructor(private router:Router,private api:ApiService, private activaterouter:ActivatedRoute, private shared:SharedService, private roomRateFb:FormBuilder){}
  ngOnInit(): void {
    this.activaterouter.params.subscribe((data:any)=>{
      console.log(data);
      this.roomId=data.id;

      this.api.viewRoom(this.roomId).subscribe((result:any)=>{
        console.log(result);
        this.room=result;
        this.roomTitle=result.title
        this.roomPrice=result.price
        this.roomImg1=result.images[0]
        this.roomImg2=result.images[1]
        this.roomImg3=result.images[2]
        this.roomImg4=result.images[3]
                
      })
    })
  }

  rateForm = this.roomRateFb.group({
    checkInDate:['',[Validators.required]],
    checkOutDate:['',[Validators.required]],
    // noOfRooms:[''],
    noOfGuest:['',[Validators.required]],
    massagePerson:[''],
    daySpaPerson:['']
  })

  // Function to add Room clean rate with total rate
  roomCleanRate(value:any){
    this.nightClean = 1
    this.nightCleanAmt = 12
  }

  // function to get no of person for massage
  massagePersonRate(){
    this.massagePersonCount = this.rateForm.value.massagePerson || ''
  }
  // function to add total massage rate with total rate
  massageRate(value:any){
    this.massageAmt = this.massagePersonCount*value
  }

  // function to get no of person for Day spa
  daySpaPersonRate(){
    this.daySpaPersonCount = this.rateForm.value.daySpaPerson || ''
    console.log(this.massagePersonCount); 
  }
  // function to add total Day spa rate with total rate
  daySpaRate(value:any){
    this.daySpaAmt = this.daySpaPersonCount*value;
  }

  showTotal(){
    this.room.price+=this.nightCleanAmt+this.massageAmt+this.daySpaAmt;
    console.log(this.room.price);
    }
  submitForm(){
    if (this.rateForm.valid) {
    this.noOfGuest=this.rateForm.value.noOfGuest || ''
      if (this.noOfGuest<=this.room.guests) {
        this.totalAmt=this.room.price
    this.checkInDate=this.rateForm.value.checkInDate || ''
    this.checkOutDate=this.rateForm.value.checkOutDate || ''

    this.shared.setconfRate(this.roomTitle,this.roomPrice,this.checkInDate,this.checkOutDate,this.noOfGuest,
      this.nightClean,this.massagePersonCount,this.daySpaPersonCount,this.nightCleanAmt,this.massageAmt,this.daySpaAmt,
      this.totalAmt);

    console.log(this.totalAmt);
    this.router.navigateByUrl(`ViewRoom/${this.room.id}/Checkout`)
      } else{
        alert("The given number of guests is greater than maximum. Enter valid number of guests")
      }
  }
  else{
    alert("Enter valid details")
  }
}
}
