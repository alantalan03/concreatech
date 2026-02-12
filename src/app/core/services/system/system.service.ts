import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EncryptDataService } from '../../security/encypt-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
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
		} 
		catch (error) {
			console.error('Failed to parse user data:', error);
			return null;
		}
	}

  	async getTypesUrbanization(lang) {
        const url = `${this.baseUrl}/v2/server/system/types_urbanization?language=${lang}`;
        
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
	async getConsumerTypes(lang) {
        const url = `${this.baseUrl}/v2/server/system/consumers-types?language=${lang}`;
        
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
	async getUnitsTypes(lang) {
        const url = `${this.baseUrl}/v2/server/system/units-types?language=${lang}`;
        
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

	async getHolidays() {
        const url = `${this.baseUrl}/v2/server/system/holidays-options`;
        
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
	async getVersions() {
        const url = `${this.baseUrl}/server/system/check-current-version`;
        
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
	async getAuditLocker(id_locker,lang,date_start,date_end,limit) {
        const url = `${this.baseUrl}/server/system/audit-locker?id_locker=${id_locker}&language=${lang}&date_start=${date_start}&date_end=${date_end}&limit=${limit}`;
        
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
	async getAvailablePropertySobriquet() {
        const url = `${this.baseUrl}/server/system/available-property-sobriquet`;
        
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
	async getPlans(lang) {
        const url = `${this.baseUrl}/v2/server/system/plans?language=${lang}`;
        
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
}
