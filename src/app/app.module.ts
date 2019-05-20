import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { VegetableDetailComponent } from './vegetable-detail/vegetable-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [
		AppComponent,
		VegetablesComponent,
		VegetableDetailComponent,
		DashboardComponent,
		MessagesComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
