import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptDataService } from '../../security/encypt-data.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UnitsPropertyService {

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

    async getUnitTypes(lang) {
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
    async getSobriquetTypes() {
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

    async postFloor(id_property, params) {
		const url = `${this.baseUrl}/v2/server/properties/${id_property}/floors`;
        ;
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

    async getFloors(id_property) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/floors`;
        
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

    async postUnits(id_property, id_created, params) {
		const url = `${this.baseUrl}/v2/server/properties/${id_property}/floors/${id_created}/units`;
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.token,
			}),
		};
		try {
			const response = await firstValueFrom(this.http.post(url, params, options));
			return response;
		} catch (error) {
			console.error('Error fetching lockers:', error);
			throw error;
		}
	}

    async getAllUnits(id_property,lang) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/units?language=${lang}`;
        
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
    async getUnit(id_property, id_unit) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/units/${id_unit}`;
        
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
    async deleteUnit(id_property, id_unit) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/units/${id_unit}`;
        const headers = this.getHeaders();
        try {
            const response = await firstValueFrom(
                this.http.delete(url, { headers })
            );
            return response;
        } catch (error) {
            console.error('Error fetching lockers:', error);
            throw error;
        }
    }

    async editUnit(id_property, id_unit, params) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/units/${id_unit}`;
        const headers = this.getHeaders();
        try {
            const response = await firstValueFrom(
                this.http.put(url, params, { headers })
            );
            return response;
        } catch (error) {
            console.error('Error fetching lockers:', error);
            throw error;
        }
    }

    async putResident(id_property, params,to_company) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/units/consumer?to_company=${to_company}`;
        const headers = this.getHeaders();
        try {
            const response = await firstValueFrom(
                this.http.post(url, params, { headers })
            );
            return response;
        } catch (error) {
            console.error('Error fetching lockers:', error);
            throw error;
        }
    }
    async updateUnitOfResident(id_unit, params,id_consume,id_propertyr) {
        const url = `${this.baseUrl}/v2/server/properties/${id_propertyr}/units/${id_unit}/consumer/${id_consume}`;
        const headers = this.getHeaders();
        try {
            const response = await firstValueFrom(
                this.http.put(url, params, { headers })
            );
            return response;
        } catch (error) {
            console.error('Error fetching lockers:', error);
            throw error;
        }
    }

    async deleteResident(id_property, id_unit,id_consumer) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/units/${id_unit}/consumer/${id_consumer}`;
        const headers = this.getHeaders();
        try {
            const response = await firstValueFrom(
                this.http.delete(url, { headers })
            );
            return response;
        } catch (error) {
            console.error('Error fetching lockers:', error);
            throw error;
        }
    }
    async paymentStatus(folio,session_id) {
        const url = `${this.baseUrl}/v2/server/integration/properties/payments/page/${folio}/status?session_id=${session_id}`;
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
    async assignUniToConsumer(id_property,params) {
        const url = `${this.baseUrl}/v2/server/properties/${id_property}/units/consumer-relate`;
        const headers = this.getHeaders();
        try {
            const response = await firstValueFrom(
                this.http.put(url, params, { headers })
            );
            return response;
        } catch (error) {
            console.error('Error fetching lockers:', error);
            throw error;
        }
    }

    async getMetricsUnit() {
        const url = `${this.baseUrl}/server/metric/units`;
        
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
