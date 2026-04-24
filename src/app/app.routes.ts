import { Routes } from '@angular/router';
import {SetupBusinessComponent} from './features/setup-business/setup-business';
import { MerchantDashboardComponent } from './features/merchantdashboard/merchant-dashboard';
import { ItemRegistrationComponent } from './features/item-registration/item-registration/item-registration';
import { Login } from './features/login/login-dashboard/login-dashboard';

export const routes: Routes = [
  {path:'setupbusiness', component:SetupBusinessComponent},
  {path:'merchantdashboard', component: MerchantDashboardComponent},
  {path:'registeritem', component: ItemRegistrationComponent},
  {path:'login', component: Login},
];
