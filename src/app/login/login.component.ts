import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from './credentials';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private credentials = {} as Credentials;

	constructor(private auth: AuthenticationService, private router: Router) {}

	ngOnInit() {
		if (this.auth.authenticated) this.router.navigateByUrl("/");
	}

	public login() {
		this.auth.authenticate(this.credentials, () => this.router.navigateByUrl("/"));
	}
}
