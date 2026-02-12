import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
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

	async getCompany() {
		const url = `${this.baseUrl}/server/company`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async getCompanyId(id_company) {
		const url = `${this.baseUrl}/server/company/` + id_company;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async postCompany(body) {
		const url = `${this.baseUrl}/server/company`;
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

	async getProperties(idCompany) {
		const url = `${this.baseUrl}/server/company/${idCompany}/propierty`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async getServicesOfProperty(idProperty) {
		const url = `${this.baseUrl}/server/company/propierty/${idProperty}/line-service`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getPropertiesID(idCompany, idProperty) {
		const url = `${this.baseUrl}/server/company/${idCompany}/propierty/${idProperty}`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async postProperties(body, idCompany) {
		const url = `${this.baseUrl}/server/company/${idCompany}/propierty`;
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

	async getLineService(lineService) {
		const url = `${this.baseUrl}/server/company/propierty/${lineService}/line-service`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async postLineService(body, idProperty) {
		const url = `${this.baseUrl}/server/company/propierty/${idProperty}/line-service`;
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

	async getStates() {
		const url = `${this.baseUrl}/server/system/states`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getCity(id_state) {
		const url = `${this.baseUrl}/server/system/cities/` + id_state;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getLineServices() {
		const url = `${this.baseUrl}/server/system/available-line-services`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(this.http.get(url, { headers }));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}
	async getLockersAvailables() {
		const url = `${this.baseUrl}/server/system/available-lockers`;
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
