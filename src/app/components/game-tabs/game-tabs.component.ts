import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/models';

@Component({
  selector: 'game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {
  @Input('game') game!:Game

  constructor() { }

  ngOnInit(): void {
    console.log(this.game.publishers)
  }

}
