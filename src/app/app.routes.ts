import { Routes } from '@angular/router';
import {SetupBusinessComponent} from './features/setup-business/setup-business';
import { MerchantDashboardComponent } from './features/merchantdashboard/merchant-dashboard';
import { ItemRegistrationComponent } from './features/item-registration/item-registration/item-registration';

export const routes: Routes = [
  {path:'setupbusiness', component:SetupBusinessComponent},
  {path:'merchantdashboard', component: MerchantDashboardComponent},
  {path:'registeritem', component: ItemRegistrationComponent}
];
