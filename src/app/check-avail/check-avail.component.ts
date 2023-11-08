import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-check-avail',
  templateUrl: './check-avail.component.html',
  styleUrls: ['./check-avail.component.css']
})
export class CheckAvailComponent implements OnInit{
  allRooms:any=[]
  checkInDate:string = ''
  checkOutDate: string = ''
  noOfGuest: string = ''
  showResult:boolean = false;
  constructor(private api:ApiService, private roomCheckFb:FormBuilder){}
  ngOnInit(): void {    
    this.api.getAllRoooms().subscribe((result:any)=>{
      console.log(result);
      this.allRooms=result;
    })
  }

  // checkForm
  checkForm = this.roomCheckFb.group({
    checkInDate:[''],
    checkOutDate:[''],
    noOfGuest:['']
  })

  submitForm(){
    if (this.checkForm.valid) {

      this.showResult=true;

      this.checkInDate= this.checkForm.value.checkInDate || ''
      this.checkOutDate= this.checkForm.value.checkOutDate || ''
      this.noOfGuest= this.checkForm.value.noOfGuest || ''
    } else {
      alert("Please enter valid details.")
    }
  }
}
