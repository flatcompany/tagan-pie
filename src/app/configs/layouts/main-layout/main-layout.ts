import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs';
import { CocktailItem } from '../../types/cocktail-item';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    MatTabNavPanel,
    MatTabNav,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    MatProgressSpinner,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatBadge,
    AsyncPipe
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout implements OnInit {
  isLoading: boolean = false;
  likeCocktails$!: Observable<CocktailItem[]>;
  allCocktails$!: Observable<CocktailItem[]>;
  longCocktails$!: Observable<CocktailItem[]>;
  shotsCocktails$!: Observable<CocktailItem[]>;

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.likeCocktails$ = this.appState.getIsLikeCocktails();
    this.allCocktails$ = this.appState.getAllCocktails();
    this.longCocktails$ = this.appState.getLongCocktails();
    this.shotsCocktails$ = this.appState.getShotsCocktails();
  }
}
