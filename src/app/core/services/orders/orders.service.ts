import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
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
	async getOrders(params) {
		const url = `${this.baseUrl}/server/package/query-package-company`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers, params })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getScheduled(params): Promise<any> {
		const url = `${this.baseUrl}/server/package/schedule`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers, params })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getCancelPackage(params): Promise<any> {
		const url = `${this.baseUrl}/server/package/cancel-package`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers, params })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getMetricsOrders(params) {
		const url = `${this.baseUrl}/server/metric/query-metric-order`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers, params })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
}
