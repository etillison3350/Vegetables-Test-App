import { Injectable } from '@angular/core';
import { MessagesService } from './messages.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
	providedIn: 'root'
})
export class RegistrationService {

	constructor(private http: HttpClient, private messagesService: MessagesService) {}

	checkUsername(username: string): Observable<boolean> {
		let params = new HttpParams().set('username', username);
		return this.http.get<boolean>('http://localhost:8080/checkuser/', {params: params});
	}

	register(user: User): Observable<User> {
		return this.http.post<User>('http://localhost:8080/user', user, httpOptions).pipe(tap(_ => this.log(`Registered user ${user.username}`)), catchError(this.handleError<User>('register')));
	}
	
	private log(message: string) {
		this.messagesService.add(message);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			
			return of(result as T);
		}
	}
	
}
