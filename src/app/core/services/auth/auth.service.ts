import {
	HttpClient,
	HttpContext,
	HttpHeaders,
	HttpParams,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private baseUrl: string = environment.url_server_backend;
	temp: string;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};

	getUserData(): any {
		const encryptedData = localStorage.getItem('data');
		if (!encryptedData) {
			console.warn('No user data found in localStorage');
			return null;
		}
		try {
			return JSON.parse(this.securityLocalStorage.decryptData(encryptedData));
		} catch (error) {
			console.error('Failed to parse user data:', error);
			return null;
		}
	}

	constructor(
		private http: HttpClient,
		private securityLocalStorage: EncryptDataService,
		private router: Router
	) {}

	// WELCOME-CODE SERVICE -------------------------------------------------->
	async validateResidenceCode(params: any) {
		return await this.http
			.get(this.baseUrl + '/server/auth/validate-code-register', {
				params: params,
			})
			.toPromise();
	}

	validate_user_password(data): Observable<any> {
		this.temp = this.baseUrl + '/server/user/validate-user-password';
		return this.http
			.post<any>(this.temp, JSON.stringify(data), this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}
	// WELCOME-CODE ERROR
	errorHandl(error) {
		return throwError('Error en auth' + error);
	}

	// STEP-1 SERVICE -------------------------------------------------->
	async obtenerUnit(params: any) {
		return this.http
			.get(this.baseUrl + '/server/auth/list-unit', { params: params })
			.toPromise();
	}

	// STEP-2 SERVICE -------------------------------------------------->
	async registerConsumerAccount(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		let url = this.baseUrl + '/server/auth/register-consumer-account';

		return await this.http.post(url, params, options).toPromise();
	}

	async validateUserPassword(params) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		let url = this.baseUrl + '/server/user/validate-user-password';
		const body = JSON.stringify(params);
		const request = new HttpRequest('POST', url, body, { headers });
		const response = await this.http.request(request).toPromise();
		return response;
	}
	async logout(obj) {
		let data = JSON.parse(
			this.securityLocalStorage.decryptData(localStorage.getItem('data'))
		);
		let token = data.token;
		const url = `${this.baseUrl}/server/user/logout`;
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			token: token,
		});
		const request = new HttpRequest('POST', url, obj, { headers });
		const response = await this.http.request(request).toPromise();
		return response;
	}

	//*FORGOT-PASSWORD -------------------------------------------------->
	post_forgot_password_user(data): Observable<any> {
		this.temp = this.baseUrl + '/server/user/forgot-password-user';
		return this.http
			.post<any>(this.temp, JSON.stringify(data), this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	async validateTockenToChangePassword(params) {
		let url = this.baseUrl + '/server/user/verify-token-reset-password';
		const request = new HttpRequest('POST', url, params);
		const response = await this.http.request(request).toPromise();
		return response;
	}
	async changePasswordService(body: any) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		let url = this.baseUrl + '/server/user/reset-password-user';
		return await this.http.post(url, body, options).toPromise();
	}
}
