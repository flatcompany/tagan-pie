import { Component, OnDestroy } from '@angular/core';
import { CocktailItem } from '../../configs/types/cocktail-item';
import { AppState } from '../../configs/state/app.state';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-random',
  imports: [
    NgClass,
    MatButton
  ],
  templateUrl: './random.html',
  styleUrl: './random.scss'
})
export class Random implements OnDestroy {
  cocktails: CocktailItem[] = [];
  currentCocktail?: CocktailItem;
  isSpinning = false;

  private rouletteSub?: Subscription;

  constructor(private appState: AppState) {
    this.appState.getAllCocktails().subscribe(cocktails => {
      this.cocktails = cocktails;
    });
  }

  ngOnDestroy() {
    this.rouletteSub?.unsubscribe();
  }

  spinRoulette() {
    if (this.isSpinning || this.cocktails.length === 0) return;

    this.isSpinning = true;

    const totalSpins = 25;
    let count = 0;

    const timeouts: number[] = [];

    for (let i = 0; i < totalSpins; i++) {
      timeouts.push(30 + i * 10);
    }

    const runSpin = () => {
      if (count >= totalSpins) {
        this.isSpinning = false;
        return;
      }

      this.currentCocktail = this.getRandomCocktail();
      setTimeout(runSpin, timeouts[count]);
      count++;
    };

    runSpin();
  }

  private getRandomCocktail(): CocktailItem {
    const idx = Math.floor(Math.random() * this.cocktails.length);
    return this.cocktails[idx];
  }
}
