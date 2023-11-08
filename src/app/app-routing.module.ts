import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';
import { CheckAvailComponent } from './check-avail/check-avail.component';
import { ViewRoomComponent } from './view-room/view-room.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  {
    path:'',redirectTo:'Home',pathMatch:'full'  
  },
  {
    path:'Home',component:HomePageComponent
  },
  {
    path:'Admin',component:AdminPageComponent
  },
  {
    path:'ViewRoom/:id',component:ViewRoomComponent
  },
  {
    path:'ViewRoom/:id/Checkout', component:CheckoutComponent
  },
  // {
  //   path:'CheckAvailability/ViewRoom/:id/SignUp',component:SignupComponent
  // },
  // {
  //   path:'Rooms&Suits/ViewRoom/:id/SignUp',component:SignupComponent
  // },
  // {
  //   path:'CheckAvailability/ViewRoom/:id/SignUp/Login',component:LoginComponent
  // },
  // {
  //   path:'Rooms&Suits/ViewRoom/:id/SignUp/Login',component:LoginComponent
  // },
  {
    path:'Rooms&Suits',component:RoomsPageComponent
  },
  // {
  //   path:'Login',component:LoginComponent
  // },
  {
    path:'MyBookings',component:BookingsComponent
  },
  {
    path:'CheckAvailability',component:CheckAvailComponent
  },
  {
    path:'Rooms&Suits/ViewRoom/:id',component:ViewRoomComponent
  },
  {
    path:'CheckAvailability/ViewRoom/:id',component:ViewRoomComponent
  },
  {
    path:'Rooms&Suits/ViewRoom/:id/Checkout',component:CheckoutComponent
  },
  {
    path:'CheckAvailability/ViewRoom/:id/Checkout',component:CheckoutComponent
  },
  {
    path:'**',component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
