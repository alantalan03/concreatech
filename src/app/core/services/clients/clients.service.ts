import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ClientsService {
	private newClientData: any = null;
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
	async getSobriquets() {
		const url = `${this.baseUrl}/server/system/available-property-sobriquet`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async getMetricClient(params: any) {
		const url = `${this.baseUrl}/server/metric/query-metric-client`;
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
	async queryClients(params): Promise<any> {
		const url = `${this.baseUrl}/server/company/query-consumer-company`;
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
	async queryClientsByProperty(params): Promise<any> {
		const url = `${this.baseUrl}/server/company/query-consumer-company`;
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

	async registerUserFromExcel(params: any) {
		const url = `${this.baseUrl}/server/user/register-bulk`;
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

	async registerConsumer(params:any, id_propierty){
		const url = `${this.baseUrl}/v2/server/properties/${id_propierty}/units/consumer`;
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
	async changeStatusofClient(params) {
		const url = `${this.baseUrl}/server/user/update-consumer`;
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
	async updateAddressee(params) {
		const url = `${this.baseUrl}/server/package/update-addressee`;
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
	async updateConsumer(params) {
		const url = `${this.baseUrl}/server/user/update-consumer`;
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
