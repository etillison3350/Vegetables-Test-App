import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { MessagesService } from './messages.service';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Vegetable } from './vegetable';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const vegetablesUrl = 'http://localhost:8080/vegetables/';

@Injectable({
	providedIn: 'root'
})
export class VegetablesService {

	constructor(private messagesService: MessagesService, private http: HttpClient) { }
  
	getVegetables(): Observable<Vegetable[]> {
		return this.http.get<Vegetable[]>(vegetablesUrl).pipe(tap(_ => this.log("Fetched vegetables")), catchError(this.handleError<Vegetable[]>('getVegetables', [])));
	}

	getTopVegetables(number: number): Observable<Vegetable[]> {
		let params = new HttpParams().set('n', `${number}`);
		return this.http.get<Vegetable[]>(`${vegetablesUrl}top/`, {params: params}).pipe(tap(_ => this.log(`Fetched top ${number} vegetables`)), catchError(this.handleError<Vegetable[]>('getTopVegetables', [])));
	}
	
	getVegetable(id: number): Observable<Vegetable> {
		return this.http.get<Vegetable>(vegetablesUrl + id).pipe(tap(_ => this.log(`Fetched vegetable id=${id}`)), catchError(this.handleError<Vegetable>('getVegetable')));
	}
	
	updateVegetable(vegetable: Vegetable): Observable<Vegetable> {
		return this.http.put<Vegetable>(`${vegetablesUrl}${vegetable.id}`, vegetable, httpOptions).pipe(tap(_ => this.log(`Updated vegetable id=${vegetable.id}`)), catchError(this.handleError<Vegetable>('updateVegetable')));
	}

	addVegetable(vegetable: Vegetable): Observable<Vegetable> {
		return this.http.post<Vegetable>(vegetablesUrl, vegetable, httpOptions).pipe(tap(_ => this.log(`Created vegetable ${vegetable.name}`)), catchError(this.handleError<Vegetable>('addVegetable')));
	}

	deleteVegetable(vegetable: Vegetable): Observable<Vegetable> {
		return this.http.delete<Vegetable>(`${vegetablesUrl}${vegetable.id}`).pipe(tap(_ => this.log(`Deleted vegetable id=${vegetable.id}`)), catchError(this.handleError<Vegetable>('deleteVegetable')));
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
