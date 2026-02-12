import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptDataService } from '../../security/encypt-data.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TransporterService {
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

	async createCarrier(params: any) {
		const url = `${this.baseUrl}/server/couriers`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(
				this.http.post(url, params, options)
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getCouriers() {
		const url = `${this.baseUrl}/server/couriers`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async deleteUser(idCourier) {
		const url = `${this.baseUrl}/server/couriers/` + idCourier;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.delete(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async updateCarrier(params: any) {
		const url = `${this.baseUrl}/server/couriers`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(
				this.http.put(url, params, options)
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async getMetrics() {
		const url = `${this.baseUrl}/server/metric/couriers?from=2025-01-01T00:00:00Z&to=2025-04-01T00:00:00Z`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async deleteCourier(idCourier) {
		const url = `${this.baseUrl}/server/couriers/${idCourier}`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.delete(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
}
