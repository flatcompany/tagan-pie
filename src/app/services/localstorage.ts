import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Localstorage {
  readonly likeKey = 'likedCocktails';

  constructor() { }

  toggleLike(id: string): void {
    const stored = localStorage.getItem(this.likeKey);
    const likedIds: string[] = stored ? JSON.parse(stored) : [];

    const index = likedIds.indexOf(id);

    if (index === -1) {
      likedIds.push(id);
    } else {
      likedIds.splice(index, 1);
    }

    localStorage.setItem(this.likeKey, JSON.stringify(likedIds));
  }

  getLikedIds(): string[] {
    const stored = localStorage.getItem(this.likeKey);
    return stored ? JSON.parse(stored) : [];
  }
}
