import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptDataService } from '../../security/encypt-data.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

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
	async getPayments(id_property) {
		const url = `${this.baseUrl}/v2/server/properties/${id_property}/payments`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async getPaymentsWithMonth(id_property, start_period_history?) {
		const url = `${this.baseUrl}/v2/server/properties/${id_property}/payments?start_period_history=${start_period_history}&end_period_history=${start_period_history}`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async getLinkToPay(folio, to_property){
		const url = `${this.baseUrl}/v2/server/integration/properties/payments/page/${folio}?to_propierty=${to_property}`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getPaymentStatus(folio){
		const url = `${this.baseUrl}/v2/server/integration/properties/payments/page/${folio}/status`;
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
