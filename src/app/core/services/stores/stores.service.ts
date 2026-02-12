import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';

@Injectable({
	providedIn: 'root',
})
export class StoresService {
	// Declarar las propiedades públicas de la clase
	public baseurl: string = environment.url_server_backend;
	private token: string;
	public data;
	constructor(
		private _http: HttpClient,
		private router: Router,
		private securityLocalStorage: EncryptDataService
	) {}

	getToken(): string {
		let data = JSON.parse(
			this.securityLocalStorage.decryptData(localStorage.getItem('data'))
		);
		return data.token;
	}

	async getStores(): Promise<any> {
		let url = this.baseurl + '/server/company/stores';
		return await this._http.get(url).toPromise();
	}

	async getLogPackages(idPackage): Promise<any> {
		let url =
			this.baseurl + '/server/company/stores/packages/logs/' + idPackage;
		return await this._http.get(url).toPromise();
	}

	async getStoreDetail(id_store): Promise<any> {
		let url = this.baseurl + '/server/company/stores/' + id_store;
		return await this._http.get(url).toPromise();
	}

	async deleteStore(id_store): Promise<any> {
		let url = this.baseurl + '/server/company/stores/' + id_store;
		return await this._http.delete(url).toPromise();
	}

	async addStore(params) {
		const headers = new HttpHeaders();
		headers.set('token', this.token);
		let url = this.baseurl + '/server/company/stores';
		const body = JSON.stringify(params);
		const request = new HttpRequest('POST', url, body, { headers });
		const response = await this._http.request(request).toPromise();
		return response;
	}

	async updateStore(params, id_store) {
		const headers = new HttpHeaders();
		headers.set('token', this.token);
		let url = this.baseurl + '/server/company/stores/' + id_store;
		const body = JSON.stringify(params);
		const request = new HttpRequest('PUT', url, body, { headers });
		const response = await this._http.request(request).toPromise();
		return response;
	}

	async updateSignsCourier(params, id_store_courier) {
		const headers = new HttpHeaders();
		headers.set('token', this.token);
		let url =
			this.baseurl + '/server/company/stores/set-courier/' + id_store_courier;
		const body = JSON.stringify(params);
		const request = new HttpRequest('PUT', url, body, { headers });
		const response = await this._http.request(request).toPromise();
		return response;
	}

	async AllCities(state: number) {
		const url = this.baseurl + '/server/company/stores/data-form/' + state;
		try {
			const cities = await this._http.get(url).toPromise();
			return cities;
		} catch (error) {
			console.error('Error loading cities:', error);
			throw new Error('Error loading cities');
		}
	}

	async getStorePackages(params: any) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseurl + '/server/company/stores/packages';
		return this._http.get(url, options).toPromise();
	}
}
