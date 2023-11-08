import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.css']
})
export class RoomsPageComponent implements OnInit{
  allRooms:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.getAllRoooms().subscribe((result:any)=>{
      console.log(result);
      this.allRooms=result;
    })
  }
}
