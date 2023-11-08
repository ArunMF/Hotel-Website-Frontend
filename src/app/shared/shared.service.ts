import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  customer:any={}
  confRate:any={}
  constructor() { }

  setconfRate(roomTitle:string,roomPrice:string,checkInD:string,checkOutD:string,guests:number,
    nightClean:number,massagePerson:string,daySpaPerson:string,nightCleanAmt:number,massageAmt:number,daySpaAmt:number,
    TAmount:string){
      this.confRate.roomTitle=roomTitle
      this.confRate.roomPrice=roomPrice
      this.confRate.checkIn=checkInD
      this.confRate.checkOut=checkOutD
      this.confRate.guests=guests
      this.confRate.nightClean=nightClean
      this.confRate.massageCount=massagePerson
      this.confRate.daySpaCount=daySpaPerson
      this.confRate.nightCleanAmt=nightCleanAmt
      this.confRate.massageAmt=massageAmt
      this.confRate.daySpaAmt=daySpaAmt
      this.confRate.totalAmount=TAmount
  }
  getconfRate(){
    return this.confRate
  }

  setCustomerId(email:string){
    this.customer.emailid=email
  }
  getCustomerId(){
    return this.customer
  }
}
