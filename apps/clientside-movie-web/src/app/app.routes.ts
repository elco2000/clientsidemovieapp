import { Route } from '@angular/router';

export const routes: Route[] = [
    {
        path: 'movies',
        loadChildren: () => import('@org/clientside-movie-web/features').then(m => m.MovieModule)
    },
    {
        path: 'actors',
        loadChildren: () => import('@org/clientside-movie-web/features').then(m => m.ActorModule)
    },
    {
        path: 'about',
        loadChildren: () => import('@org/clientside-movie-web/features').then(m => m.AboutModule)
    }
];
