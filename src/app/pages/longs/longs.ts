import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CocktailItem } from '../../configs/types/cocktail-item';
import { AppState } from '../../configs/state/app.state';
import { AsyncPipe } from '@angular/common';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-longs',
  imports: [
    AsyncPipe,
    Card
  ],
  templateUrl: './longs.html',
  styleUrl: './longs.scss'
})
export class Longs implements OnInit {
  displayedCocktails$!: Observable<CocktailItem[]>;

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.displayedCocktails$ = this.appState.getLongCocktails();
  }
}
