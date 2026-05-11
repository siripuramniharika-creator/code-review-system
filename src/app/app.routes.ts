import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Signup } from './signup/signup';
import { Forgotpassword } from './forgotpassword/forgotpassword';
import { Dashboard } from './dashboard/dashboard';
import { History } from './history/history';
import { Utils } from './utils/utils';
import { Profile } from './profile/profile';

export const routes: Routes = [
    {path:'',component: Home},
    {path:'utils',component:Utils},
    {path:'signup',component: Signup},
    {path:'forgot-password',component:Forgotpassword},
    {path:'dashboard',component:Dashboard},
    {path:'history',component:History},
    {path:'profile',component:Profile}
];
