import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class WorkerService {
	private token: string | undefined;
	private baseUrl: string = environment.url_server_backend;

	constructor(
		private http: HttpClient,
		private securityLocalStorage: EncryptDataService
	) {
		const userData = this.getUserData();
		this.token = userData?.token;
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
	private getHeaders(): HttpHeaders {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			token: this.token || '',
		});
	}

	async rebotSession(body) {
		const url = `${this.baseUrl}/server/workers/rebot-session?language=es&refresh_code=false`;
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
	async refreshCode(body) {
		const url = `${this.baseUrl}/server/workers/rebot-session?language=es&refresh_code=true`;
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
	async getMetrics() {
		const url = `${this.baseUrl}/server/metric/workers`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getDataTable(language, date_start, date_end) {
		const url = `${this.baseUrl}/server/workers/packages?language=${language}&date_start=${date_start}&date_end=${date_end}`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getDataTableOfWorker(language, date_start, date_end, id_user) {
		const url = `${this.baseUrl}/server/workers/packages/${id_user}?language=${language}&date_start=${date_start}&date_end=${date_end}`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
}
