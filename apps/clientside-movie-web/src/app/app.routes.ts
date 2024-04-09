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
    },
    {
        path: 'auth',
        loadChildren: () => import('@org/clientside-movie-web/web-auth').then(m => m.AuthModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('@org/clientside-movie-web/features').then(m => m.ProfileModule)
    },
    {
        path: 'collections',
        loadChildren: () => import('@org/clientside-movie-web/features').then(m => m.CollectionModule)
    },
    {
        path: 'reviews',
        loadChildren: () => import('@org/clientside-movie-web/features').then(m => m.ReviewModule)
    },
    { 
        path: '**',
        loadChildren: () => import('@org/clientside-movie-web/features').then(m => m.MovieModule)
    }
];
