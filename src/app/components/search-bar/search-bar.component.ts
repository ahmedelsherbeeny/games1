import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchword:any


  constructor(public router:Router,private httpser:HttpserviceService) { }

  ngOnInit(): void {
  }
  
  search($event: any){
    this.searchword=($event.target as HTMLInputElement).value
    this.httpser.searchkey.next(this.searchword)

  }

}
