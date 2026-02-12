import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
	bodySignIn,
	responseSignInInterface,
} from '../../models/signIn.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { TranslateService } from '../translate/translate.service';
import { environment } from 'src/environments/environment.dev';
@Injectable({
	providedIn: 'root',
})
export class LoginService {
	public ts = inject(TranslateService);

	private baseUrl: string = environment.url_server_backend + 'v1/';
	temp: string;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'vivi-client-name': 'return-portal',
		}),
	};
	constructor(private http: HttpClient) {}

	signIn(params: bodySignIn): Observable<responseSignInInterface> {
		const lang = this.ts.GetLang;
		let httpParams = new HttpParams().set('lang', lang);
		const url = `${this.baseUrl}auth-service/sign-in`;
		return this.http
			.post<responseSignInInterface>(url, params, {
				...this.httpOptions,
				params: httpParams,
			})
			.pipe(
				map((resp) => {
					return resp;
				}),
				catchError((error) => {
					return of(error.error);
				})
			);
	}
}
