import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { APIResponse, Game } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  searchkey:any=new BehaviorSubject<string>('')
  publishers:any
  results:any

 

  constructor(private http:HttpClient) { }



  getGameList(ordering:string,search?:string):Observable<APIResponse<Game>>{

    let parms=new HttpParams().set('ordering',ordering)
    if(search){
      let parms=new HttpParams().set('ordering',ordering).set('search',search)
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
      params:parms
    })
    

  }
  getGamedetails(id: string): Observable<APIResponse<Game>> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
  
}
