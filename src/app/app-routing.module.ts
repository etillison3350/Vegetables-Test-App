import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VegetablesComponent } from './vegetables/vegetables.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VegetableDetailComponent } from './vegetable-detail/vegetable-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'vegetables', component: VegetablesComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'details/:id', component: VegetableDetailComponent},
	{path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
