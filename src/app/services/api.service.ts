import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { 
    
  }

  BASE_URL ='https://hotel-website-f51z.onrender.com'

  getAllRoooms(){
      return this.http.get(`${this.BASE_URL}/rooms/all-rooms`)
  }

  viewRoom(roomid:string){
    return this.http.get(`${this.BASE_URL}/rooms/view-room/${roomid}`)
  }

  userSignup(username:any,email:any,password:any){
    const body={
      username,
      email,
      password
    }
    return this.http.post(`${this.BASE_URL}/users/new-user`,body)
  }

  userLogin(email:any,password:any){
    const body={
      email,
      password
    }
    return this.http.post(`${this.BASE_URL}/users/login`,body)
  }

  addBookings(booking:any){
    const body = {
      firstName:booking.firstName,
      lastName:booking.lastName,
      emailId:booking.emailId,
      phone:booking.phone,
      company:booking.company,
      address:booking.address,
      country:booking.country,
      state:booking.state,
      district:booking.district,
      postalCode:booking.postalCode,
      orderNotes:booking.orderNotes,
      roomType:booking.roomType,
      checkIn:booking.checkIn,
      checkOut:booking.checkOut,
      guests:booking.guests,
      roomClean:booking.roomClean,
      massageCount:booking.massageCount,
      spaCount:booking.spaCount,
      totalAmt:booking.totalAmt,
      payMethod:booking.payMethod
    }
    return this.http.post(`${this.BASE_URL}/bookings/new-booking`,body)
  }

  getAllBookings(){
    return this.http.get(`${this.BASE_URL}/bookings/all-bookings`)
  }

  adminLogin(email:any,password:any){
    const loginBody = {
      email,
      password
    }
    return this.http.post(`${this.BASE_URL}/admin/admin-login`,loginBody)
  }
}
