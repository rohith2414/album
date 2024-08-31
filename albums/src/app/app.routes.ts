import { Routes } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    {
        path:"allAlbums",
        component:AlbumsComponent
    },
    {
        path:"addAlbum",
        component:AddAlbumComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"signup",
        component:SignupComponent
    }
];
