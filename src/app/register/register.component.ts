import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from '../login/credentials';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	invalid$: Observable<boolean>;
	private usernameCheck = new Subject<string>();

	private differentPasswords: boolean;
	private registrationError = undefined as string;

	private user = {} as User;

	constructor(private registration: RegistrationService, private auth: AuthenticationService, private router: Router) { }

	ngOnInit() {
		this.invalid$ = this.usernameCheck.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap((name: string) => this.registration.checkUsername(name))
		);
	}

	public checkUsername(username: string) {
		this.usernameCheck.next(username);
	}

	public checkPasswords(p1: string, p2: string) {
		this.differentPasswords = p1 != p2;
	}

	public register() {
		if (this.differentPasswords) {
			this.registrationError = 'Please correct the indicated fields';
		}

		this.registration.register(this.user).subscribe((user: User) => {
			if (user) {
				this.auth.authenticate({username: user.username, password: this.user.password}, () => this.router.navigateByUrl("/"));
			} else {
				this.registrationError = 'An error occurred during registration';
			}
		});
	}

}
