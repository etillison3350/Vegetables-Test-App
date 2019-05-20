import { Injectable } from '@angular/core';
import { MessagesService } from './messages.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Credentials } from './login/credentials';
import { Permissions } from './permissions';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public authenticated: boolean;

	public currentUser: Credentials;
	public currentUserPermissions: Permissions;

	constructor(private http: HttpClient, private messagesService: MessagesService) {}

	public authenticate(credentials: Credentials, callback: () => any) {
		const headers = new HttpHeaders(credentials ? {authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)} : {});
		
		this.http.get('http://localhost:8080/user', {headers: headers}).subscribe(response => {
			if (response['name']) {
				this.authenticated = true;
				this.log('Logged in as ' + credentials.username);

				this.currentUserPermissions = {} as Permissions;
				for (let permission of response['authorities']) {
					if (permission.authority == 'ADMIN') {
						this.currentUserPermissions = {create: true, read: true, update: true, delete: true};
						break;
					} else {
						this.currentUserPermissions[(permission.authority as string).toLowerCase()] = true;
					}
				}
			} else {
				this.authenticated = false;
				this.log('Failed to log in');
			}

			return callback && callback();
		})
	}

	public logout(): void {
		this.authenticated = false;
		this.currentUser = undefined;

		this.log('Logged out');
	}

	private log(message: string): void {
		this.messagesService.add(message);
	}

	public hasPermission(permission: string): boolean {
		return this.authenticated && this.currentUserPermissions[permission];
	}
}
