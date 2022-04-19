import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { Game, APIResponse } from 'src/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public gamess!: any
  routesub!:Subscription
  gamesub!:Subscription
  searchKey:any
  publishers:any
  gamerating=0
  filteredgames:any
 
  constructor(private httpService:HttpserviceService,private activatedRoute:ActivatedRoute,private router:Router) { }
  
 

  ngOnInit(): void {
 this.routesub=this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
    this.httpService.searchkey.subscribe((a:any)=>{
      this.searchKey=a
    })
  }
  searchGames(sort: string, search?: string): void {
    this.gamesub= this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.gamess = gameList.results;
        this.filteredgames=this.gamess
        console.log(this.gamess);
        console.log(this.gamess[0].metacritic);

        
      });
  }
  openGameDetails(id:any){
    this.router.navigate(['details',id])


  }


  filteredmorethan95(rating:any){
    this.filteredgames=this.gamess.filter((a:any)=>{
      
        if(a.metacritic >= rating || rating===""){
          return a
        

      }
      
    })

  }
  filteredmorethan90(rating:any){
    this.filteredgames=this.gamess.filter((a:any)=>{
      
        if((a.metacritic >= rating && a.metacritic < 95) || rating===""){
          return a
        

      }
      
    })

  }
  filteredmorethan80(rating:any){
    this.filteredgames=this.gamess.filter((a:any)=>{
      
        if((a.metacritic >= rating && a.metacritic < 90) || rating===""){
          return a
        

      }
      
    })

  }
  below80(rating:any){
    this.filteredgames=this.gamess.filter((a:any)=>{
      
        if(( a.metacritic < 80) || rating===""){
          return a
        

      }
      
    })

  }
  
  ngOnDestroy(): void {
    if(this.gamesub){
      this.gamesub.unsubscribe();
    }
    if(this.routesub){
      this.routesub.unsubscribe();
    }
  }

}
