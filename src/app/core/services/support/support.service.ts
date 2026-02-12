import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptDataService } from '../../security/encypt-data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SupportService {
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

	async getTickets(params) {
		const url = `${this.baseUrl}/v2/server/support`;
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

	async getTicket(params,id_ticket) {
		const url = `${this.baseUrl}/v2/server/support/${id_ticket}`;
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

	async getTopicTickets() {
		const url = `${this.baseUrl}/v2/server/system/topic-ticket`;
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

	async updateSubjectOfTicket(params,id_ticket){
		const url = `${this.baseUrl}/v2/server/support/${id_ticket}`;
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
			console.error('Error al actualizar ticket:', error);
			console.log('Detalles del error:', error?.error);      // <- Backend
			console.log('Status:', error?.status);
			console.log('Message:', error?.message);
			throw error.error;
		}
	}

	async updateStatusOfTicket(params,id_ticket){
		const url = `${this.baseUrl}/v2/server/support/${id_ticket}`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(this.http.put(url, params, options))
			console.log(response);
			return response;
		} catch (error: any) {
			console.error('Error al actualizar ticket:', error);
			console.log('Detalles del error:', error?.error);      // <- Backend
			console.log('Status:', error?.status);
			console.log('Message:', error?.message);
			throw error.error;
		}
	}

	async sendMessage(params,id_ticket){
		const url = `${this.baseUrl}/v2/server/support/${id_ticket}/messages`;
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
			console.error('Error al actualizar ticket:', error);
			console.log('Detalles del error:', error?.error);      // <- Backend
			console.log('Status:', error?.status);
			console.log('Message:', error?.message);
			throw error.error;
		}
	}

	async deleteTicket(id_ticket){
		const url = `${this.baseUrl}/v2/server/support/${id_ticket}`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(
				this.http.delete(url, options)
			);
			return response;
		} catch (error) {
			console.error('Error al actualizar ticket:', error);
			console.log('Detalles del error:', error?.error);      // <- Backend
			console.log('Status:', error?.status);
			console.log('Message:', error?.message);
			throw error.error;
		}
	}

	async getMessages(id_ticket){
		const url = `${this.baseUrl}/v2/server/support/${id_ticket}/messages?language`;
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

	async getallUsersSupport(id_propierty, id_user_propierty_support){
		const url = `${this.baseUrl}/v2/server/system/propierty/${id_propierty}/user-support/${id_user_propierty_support}`;
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
	async assignUserToTicket(params,id_ticket){
		const url = `${this.baseUrl}/v2/server/support/${id_ticket}`;
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
			console.error('Error al actualizar ticket:', error);
			console.log('Detalles del error:', error?.error);      // <- Backend
			console.log('Status:', error?.status);
			console.log('Message:', error?.message);
			throw error.error;
		}
	}

}
