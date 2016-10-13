import { provideRouter, RouterConfig } from '@angular/router';
import {DashboardComponent} from './dashboard';
import {LoginComponent} from './login';
import {ProductComponent} from './product/';
import {OutletComponent} from './outlet';
import {ReportComponent} from './report';
import {SpComponent} from './sp';
import {StarComponent} from './star';
import {PromotionComponent} from './promotion';
import {CategoryComponent} from './category';
import {PageNotFoundComponent} from './page-not-found';
import {DistributorComponent} from './distributor';
import {CreateSpComponent} from './create-sp';
import {ViewerComponent} from './viewer';
import {SettingComponent} from './setting';

const routes: RouterConfig = [
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent },
{ path: 'product', component: ProductComponent },
{ path: 'distributor', component: DistributorComponent },
{ path: 'outlet', component: OutletComponent },
{ path: 'report', component: ReportComponent },
{ path: 'sf', component: SpComponent },
{ path: 'viewer', component: ViewerComponent },
{ path: 'sf/create', component: CreateSpComponent },
{ path: 'sf/edit/:id', component: CreateSpComponent },
{ path: 'category', component: CategoryComponent },
{ path: 'promotion', component: PromotionComponent },
{ path: 'star', component: StarComponent },
{ path: 'setting', component: SettingComponent },
{ path: '**', component: ReportComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];


