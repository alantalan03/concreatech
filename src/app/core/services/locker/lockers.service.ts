import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LockersService {
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

	async queryLockerWarehouse(params: any): Promise<any> {
		const url = `${this.baseUrl}/server/locker/query-locker-warehouse`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers, params })
			);
			return response;
		} catch (error) {
			console.error('Error querying locker warehouse:', error);
			throw error;
		}
	}

	async getLockers(params: any): Promise<any> {
		const url = `${this.baseUrl}/server/locker/query-locker-retail`;
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
	async getMetricsLocker(params) {
		const url = `${this.baseUrl}/server/metric/query-metric-locker`;
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
	async getAllModules(){
		const url = `${this.baseUrl}/v2/server/locker/modules`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getLockerEnvironments(){
		const url = `${this.baseUrl}/v2/server/system/locker-environments`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getLockerTypes(){
		const url = `${this.baseUrl}/v2/server/system/locker-types`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getLockerModels(){
		const url = `${this.baseUrl}/v2/server/system/locker-models`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getLockerPrivacy(){
		const url = `${this.baseUrl}/v2/server/system/locker-privacy`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.get(url, { headers })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async postLocker(body) {
		const url = `${this.baseUrl}/v2/server/locker/assemble`;
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
	async changeStatusOfCompartment(id_locker,id_locker_dimention, params) {
		const url = `${this.baseUrl}/v2/server/locker/${id_locker}/door/${id_locker_dimention}`;
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
}
