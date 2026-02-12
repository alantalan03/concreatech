import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private token: string | undefined;
	private baseUrl: string = environment.url_server_backend;

	constructor(
		private http: HttpClient,
		private securityLocalStorage: EncryptDataService
	) {
		const userData = this.getUserData();
		this.token = userData?.token;
	}
	private getHeaders(): HttpHeaders {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			token: this.token || '',
		});
	}
	private getUserData(): any {
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

	async updateDataUser(body) {
		const url = `${this.baseUrl}/server/user/update-data-user`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(this.http.put(url, body, options));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async updateDataPreferencesUser(body) {
		const url = `${this.baseUrl}/server/user/update-data-preferences`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(this.http.put(url, body, options));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async changePassword(body) {
		const url = `${this.baseUrl}/server/user/reset-password-user`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(this.http.post(url, body, options));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async logout(obj) {
		const url = `${this.baseUrl}/server/user/logout`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(this.http.post(url, obj, options));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
}
