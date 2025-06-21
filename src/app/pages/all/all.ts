import { Component, OnInit } from '@angular/core';
import { defaultData } from '../../configs/data/default-data';
import { Card } from '../../components/card/card';
import { AppState } from '../../configs/state/app.state';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CocktailItem } from '../../configs/types/cocktail-item';


@Component({
  selector: 'app-main',
  imports: [
    Card,
    AsyncPipe,
  ],
  templateUrl: './all.html',
  standalone: true,
  styleUrl: './all.scss'
})
export class All implements OnInit {
  displayedCocktails$!: Observable<CocktailItem[]>;

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.displayedCocktails$ = this.appState.getAllCocktails();
  }
}
