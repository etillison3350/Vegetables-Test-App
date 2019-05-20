import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

	constructor(private auth: AuthenticationService) {}
	
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.auth.authenticated && this.auth.currentUser) {
			req = req.clone({
				setHeaders: {authorization: 'Basic ' + btoa(this.auth.currentUser.username + ':' + this.auth.currentUser.password)}
			});
		}

		return next.handle(req);
	}
}
