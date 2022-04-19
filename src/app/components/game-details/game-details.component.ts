import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { APIResponse, Game } from 'src/models/models';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit,OnDestroy {
  gameRating=0
  gameid!:string
  routesub!:Subscription
  gamesub!:Subscription
  game$:any
  background_image!:string
  name!:string
  released!:string
  genres:any
metacritic_url!:string
  constructor(private acroute:ActivatedRoute,private httpser:HttpserviceService) { }
  ngOnDestroy(): void {
    if(this.gamesub){
      this.gamesub.unsubscribe();
    }
    if(this.routesub){
      this.routesub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routesub=this.acroute.params.subscribe((params:Params)=>{
      this.gameid=params['id']
      this.getGameDetails(this.gameid)


    })


  }
  getGameDetails(gameid: string) {
    this.httpser.getGamedetails(gameid).subscribe((gameResp:APIResponse<Game>)=>{
      this.game$=gameResp
      this.background_image=this.game$.background_image
      this.name=this.game$.name
      this.metacritic_url=this.game$.metacritic_url
      this.genres=this.game$.genres
      this.released=this.game$.released

      setTimeout(() => {
        this.gameRating=this.game$.metacritic
        
      }, 1000);

      
    })

  }
getColor(value:number):string{
  if(value>75){
    return '#5ee342'
  }
  if(value>50){
    return '#fffa50'
  }
  if(value>30){
    return '#f7aa38'
  }
  else {
    return '#ef4655'
  }

}

}
