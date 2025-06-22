import { Component, Input, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatIconButton } from '@angular/material/button';
import { CocktailItem } from '../../configs/types/cocktail-item';
import { AppState } from '../../configs/state/app.state';
import { MatIcon } from '@angular/material/icon';
import { Localstorage } from '../../services/localstorage';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatDivider,
    MatCardFooter,
    MatCardActions,
    MatButton,
    MatCardImage,
    MatIcon,
    MatIconButton,
    NgClass
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements OnInit {
  @Input() cocktail!: CocktailItem
  isLiked: boolean = false;

  constructor(private appState: AppState, private localStorage: Localstorage) {
  }

  ngOnInit() {
    const likedIds= this.localStorage.getLikedIds()
    this.isLiked = likedIds.includes(this.cocktail.id);
  }

  toggleDetailInfo(id: string): void {
    this.appState.toggleExpand(id);
  }

  toggleLike(id: string): void {
    this.appState.toggleLike(id);
  }
}
