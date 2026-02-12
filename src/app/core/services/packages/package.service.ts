import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PackageService {
	private token: string | undefined;
	private baseUrl: string = environment.url_server_backend;

	constructor(
		private http: HttpClient,
		private securityLocalStorage: EncryptDataService
	) {
		const userData = this.getUserData();
		this.token = userData?.token;
	}

	getToken(): string {
		let data = JSON.parse(
			this.securityLocalStorage.decryptData(localStorage.getItem('data'))
		);
		this.token = data.token;
		return data.token;
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
	async getMetadataLabel(id_package, lang) {
		const url = `${this.baseUrl}/server/package/asignation/${id_package}?language=${lang}`;
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
	async getPackageUnassined(id_locker?: string, lang?: string) {
		const url = `${this.baseUrl}/server/package/unassigned?id_locker=${id_locker}`;
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
	async putMetadataLabel(id_package, lang, body) {
		const url = `${this.baseUrl}/server/package/asignation/${id_package}?language=${lang}`;
		const headers = this.getHeaders();
		try {
			const response = await firstValueFrom(
				this.http.put(url, { headers })
			);
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

	async putMetadata(id_package, lang,body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		const url = `${this.baseUrl}/server/package/asignation/${id_package}?language=${lang}`;
		return await this.http.put(url, body, options).toPromise();
	}
	async getFailures(id_locker?: string) {
		const params: any = {};
		if (id_locker) {
			params.id_locker = id_locker;
		}

		const url = `${this.baseUrl}/server/package/failures`;
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
