import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Card } from '../../components/card/card';
import { Observable } from 'rxjs';
import { CocktailItem } from '../../configs/types/cocktail-item';
import { AppState } from '../../configs/state/app.state';

@Component({
  selector: 'app-likes',
  imports: [
    AsyncPipe,
    Card
  ],
  templateUrl: './likes.html',
  styleUrl: './likes.scss'
})
export class Likes implements OnInit {
  displayedCocktails$!: Observable<CocktailItem[]>;

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.displayedCocktails$ = this.appState.getIsLikeCocktails();
  }
}
