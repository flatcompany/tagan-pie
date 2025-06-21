import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { defaultData } from '../data/default-data';
import { CocktailItem } from '../types/cocktail-item';
import { Localstorage } from '../../services/localstorage';

type cocktailsType = 'shots' | 'longs'

@Injectable({
  providedIn: 'root'
})
export class AppState {
  private cocktails = new BehaviorSubject<Record<cocktailsType, CocktailItem[]>>(defaultData);
  readonly cocktails$ = this.cocktails.asObservable();

  constructor(private localStorage: Localstorage) {}

  getAllCocktails(): Observable<CocktailItem[]> {
    return this.cocktails$
      .pipe(
        map((cocktails) => {
          const all = [...cocktails.longs, ...cocktails.shots];

          return this.markLiked(all)
        })
      )
  }

  getLongCocktails(): Observable<CocktailItem[]> {
    return this.cocktails$
      .pipe(
        map((cocktails) => {
          return this.markLiked(cocktails.longs);
        })
      )
  };

  getShotsCocktails(): Observable<CocktailItem[]> {
    return this.cocktails$
      .pipe(
        map((cocktails) => {
          return this.markLiked(cocktails.shots);
        })
      )
  };

  getIsLikeCocktails(): Observable<CocktailItem[]> {
    return this.cocktails$
      .pipe(
        map((cocktails) => {
          const all = [...cocktails.longs, ...cocktails.shots];

          return this.markLiked(all).filter(c => c.isLike);
        })
      )
  }

  toggleLike(id: string): void {
    this.localStorage.toggleLike(id);

    const current = this.cocktails.value;

    const updated = this.updateCocktailById(current, id, (cocktail) => ({
      ...cocktail,
      isLike: !cocktail.isLike
    }));

    this.cocktails.next(updated);
  }

  toggleExpand(id: string): void {
    const current = this.cocktails.value;

    const updated = this.updateCocktailById(current, id, (cocktail) => ({
      ...cocktail,
      isExpanded: !cocktail.isExpanded
    }));

    this.cocktails.next(updated);
  }

  private markLiked(items: CocktailItem[]): CocktailItem[] {
    const likedIds = this.localStorage.getLikedIds();
    return items.map(item => ({
      ...item,
      isLike: likedIds.includes(item.id)
    }));
  }

  private updateCocktailById(
    data: Record<cocktailsType, CocktailItem[]>,
    id: string,
    updater: (cocktail: CocktailItem) => CocktailItem
  ): Record<cocktailsType, CocktailItem[]> {
    const updated: Record<cocktailsType, CocktailItem[]> = {} as any;

    for (const type in data) {
      updated[type as cocktailsType] = data[type as cocktailsType].map(cocktail =>
        cocktail.id === id ? updater(cocktail) : cocktail
      );
    }

    return updated;
  }

}
