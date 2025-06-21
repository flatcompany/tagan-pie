import { Routes } from '@angular/router';
import { All } from './pages/all/all';
import { MainLayout } from './configs/layouts/main-layout/main-layout';
import { Shots } from './pages/shots/shots';
import { Longs } from './pages/longs/longs';
import { Likes } from './pages/likes/likes';
import { Random } from './pages/random/random';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: All },
      { path: 'shots', component: Shots },
      { path: 'longs', component: Longs },
      { path: 'likes', component: Likes },
      { path: 'random', component: Random },
    ]
  }
];
