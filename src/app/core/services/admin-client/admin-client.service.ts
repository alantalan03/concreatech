import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EncryptDataService } from '../../security/encypt-data.service';

@Injectable({
	providedIn: 'root',
})
export class AdminClientService {
	public baseUrl: string = environment.url_server_backend;
	private token: string;
	private options: any;
	public temp: any;
	public data;

	constructor(
		private http: HttpClient,
		private securityLocalStorage: EncryptDataService
	) {}

	setToken(token: string) {
		this.token = token;
	}

	getToken(): string {
		let data = JSON.parse(
			this.securityLocalStorage.decryptData(localStorage.getItem('data'))
		);
		this.token = data.token;
		return data.token;
	}

	//*REGISTER-ADMIN SERVICE SECTORS-------------------------------------------------->
	async getSectors(params: any): Promise<any> {
		let options = { params };
		let url = this.baseUrl + '/server/company/query-sectors';
		return await this.http.get(url, options).toPromise();
	}

	//*REGISTER-ADMIN SERVICE PROPERTY -------------------------------------------------->
	async getPropierty(params: any): Promise<any> {
		let options = { params };
		let url = this.baseUrl + '/server/company/query-propierty-unit';
		return await this.http.get(url, options).toPromise();
	}

	//*REGISTER-ADMIN SERVICE UNITY   -------------------------------------------------->
	async getUnit(params: any): Promise<any> {
		let options = { params };
		let url = this.baseUrl + '/server/company/query-unit';
		return await this.http.get(url, options).toPromise();
	}

	//*REGISTER-ADMIN SERVICE PROPERTY -------------------------------------------------->
	async registerConsumerAccount(params) {
		let url = this.baseUrl + '/server/auth/register-consumer-account';
		return await this.http.post(url, params).toPromise();
	}

	//!------------------------------------------------------------------------->

	errorHandl(error) {
		return throwError(error);
	}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			// 'timeout': `${120000}`
		}),
	};

	getData() {
		return this.data;
	}

	getdataCameraEvnet() {
		return localStorage.getItem('url_cam_event');
	}

	setdataCameraEvent(value) {
		localStorage.setItem('url_cam_event', value);
	}

	//*TABLE-P-ADMIN -------------------------------------------------->
	get_log_user(data): Observable<any> {
		this.temp = this.baseUrl + '/server/user/log-user';
		let params = new HttpParams();
		Object.keys(data).forEach(function (item) {
			params = params.set(item, data[item]);
		});
		return this.http
			.get<any>(this.temp, { params })
			.pipe(retry(1), catchError(this.errorHandl));
	}

	//*FORGOT-PASSWORD -------------------------------------------------->
	post_forgot_password_user(data): Observable<any> {
		this.temp = this.baseUrl + '/server/user/forgot-password-user';
		return this.http
			.post<any>(this.temp, JSON.stringify(data), this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	//*CLIENT-PROFILE-CLIENT -------------------------------------------------->
	update_update_data_user(data): Observable<any> {
		this.temp = this.baseUrl + '/server/user/update-data-user';
		return this.http
			.put(this.temp, data, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	//*LOCKER-DETAIL-ADMIN -------------------------------------------------->
	post_reboot_unit(data): Observable<any> {
		this.temp = this.baseUrl + '/server/locker/reboot-unit';
		return this.http
			.post<any>(this.temp, JSON.stringify(data), this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	//* HEADER-ADMIN-COMPONENT -------------------------------------------------->
	post_log_package_user(data): Observable<any> {
		this.temp = this.baseUrl + '/server/package/log-package-user';

		return this.http
			.post<any>(this.temp, data, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	//*CREATE-USER-ADMIN -------------------------------------------------->
	validatedObjecEmpty(data: Object) {
		const removeEmpty = (obj: any) => {
			Object.keys(obj).forEach((key) => {
				if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
				else if (obj[key] === undefined) delete obj[key];
			});
			return obj;
		};
		return removeEmpty(data);
	}

	//*TABLE-FILTER-BY-YEAR -------------------------------------------------->
	async getMetricsByYear(params) {
		let options = {
			params: params,
		};

		let url = this.baseUrl + '/server/package/query-data-package-classifieds';
		let data: any = await this.http.get(url, options).toPromise();
		return data;
	}

	//*TABLE-FILTER-BY-YEAR -------------------------------------------------->
	async getMetricsByDay(params) {
		let options = {
			params: params,
		};

		let url = this.baseUrl + '/server/package/query-data-package-day-week';
		let data: any = await this.http.get(url, options).toPromise();
		return data;
	}

	//*ADMIN-DETAIL-LOCKER SERVICE ---------------------------------------------->
	async queryResourcesLocker(params): Promise<any> {
		let options = {
			params: params,
		};

		let url = this.baseUrl + '/server/locker/query-resources-locker';
		return await this.http.get(url, options).toPromise();
	}

	//!------------------------------------------------------------------------->

	async getLockerCompartment(params): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};

		let url = this.baseUrl + '/server/locker/query-locker-comparment';
		return await this.http.get(url, options).toPromise();
	}

	async getSchedulePackage(params): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/package/query-schedule-package';
		return await this.http.get(url, options).toPromise();
	}

	async getDataLogsPackage(params): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};

		let url = this.baseUrl + '/server/system/audi-package';
		return await this.http.get(url, options).toPromise();
	}

	async getDataVersion(params): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};

		let url = this.baseUrl + '/server/system/query-version';
		return await this.http.get(url, options).toPromise();
	}

	async getQuantityMonth(params): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/package/quantity-month';
		let data: any = await this.http.get(url, options).toPromise();
		return data.quantity_month;
	}

	async getStatusPingLocker(params): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/locker/get-status-ping-locker';
		return await this.http.get(url, options).toPromise();
	}

	async getLogSystem(params): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/company/log-system';
		return await this.http.get(url, options).toPromise();
	}

	// async getMostActiveLocker(params) {
	// 	let options = {
	// 		headers: new HttpHeaders({
	// 			'Content-Type': 'application/json',
	// 			token: this.getToken(),
	// 		}),
	// 		params: params,
	// 	};
	// 	let url = this.baseUrl + '/server/package/quantity-locker-company';
	// 	let data: any = await this.http.get(url, options).toPromise();
	// 	return data.return_result[0][1];
	// }

	//! LOCKER ----------------------------------------------------------->
	async getLockersRetail(params) {
		this.getToken();
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/locker/query-locker-retail';
		let data: any = await this.http.get(url, options).toPromise();
		if (!data.mensaje_return.ERROR) {
			return data.return_result[0][1];
		} else {
			return [];
		}
	}
	//! LOCKER ----------------------------------------------------------->
	async getLockersGrid(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/locker/query-door-locker-grid';
		return await this.http.get(url, options).toPromise();
	}
	async auditLocker(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/system/audit-locker';
		return await this.http.get(url, options).toPromise();
	}
	async getOrders(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/package/query-package-company';
		let data: any = await this.http.get(url, options).toPromise();
		return data;
	}
	async getAllOrders(params) {
		let options = {
			header: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/package/query-package-company';
		return await this.http.get(url, options).toPromise();
	}
	async getUser(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		return await this.http
			.get(this.baseUrl + '/server/company/query-user', options)
			.toPromise();
	}
	async getAllEmployeesAdmin(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		return await this.http
			.get(this.baseUrl + '/server/company/query-admin', options)
			.toPromise();
	}
	async getAllEmployees(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		return await this.http
			.get(this.baseUrl + '/server/company/query-employee', options)
			.toPromise();
	}
	async deleteEmployee(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			body: params,
		};
		return await this.http
			.delete(this.baseUrl + '/server/company/delete-employee', options)
			.toPromise();
	}
	async deleteSchedulePackage(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			body: params,
		};
		return await this.http
			.delete(this.baseUrl + '/server/package/delete-schedule-package', options)
			.toPromise();
	}
	async deleteEmployeeAdmin(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			body: params,
		};
		return await this.http
			.delete(this.baseUrl + '/server/company/delete-admin', options)
			.toPromise();
	}
	async deleteUserConsumer(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		return await this.http
			.post(this.baseUrl + '/server/company/delete-consumer', body, options)
			.toPromise();
	}
	async disconectVideoCam(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/locker/disconect-video-cam';
		return await this.http.post(url, body, options).toPromise();
	}
	async transmitEvent(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		await this.http
			.get(this.baseUrl + '/server/locker/transmit-event', options)
			.toPromise();
	}
	async queryVideoCam(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/locker/query-video-cam';
		return await this.http.post(url, body, options).toPromise();
	}
	async changeClientEmail(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/package/change-client-email';
		return await this.http.post(url, body, options).toPromise();
	}
	async registerClient(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/company/register-client';
		return await this.http.post(url, body, options).toPromise();
	}
	async updateQRAccess(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/company/create-qr-access';
		return await this.http.post(url, body, options).toPromise();
	}
	async createOrder(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/package/schedule-package';
		return await this.http.post(url, body, options).toPromise();
	}
	async validateTracking(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/package/validate-tracking';
		return await this.http.post(url, body, options).toPromise();
	}
	async createQr(body: any) {
		const headers = {
			'Content-Type': 'application/json',
			token: this.getToken(),
		};
		const requestOptions = {
			headers: new HttpHeaders(headers),
		};
		const url = `${this.baseUrl}/server/company/create-qr-access`;
		return await this.http.post(url, body, requestOptions).toPromise();
	}
	async createUser(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/user/register-user';
		return await this.http.post(url, body, options).toPromise();
	}
	async udpateEmployee(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/company/update-employee';
		return await this.http.put(url, body, options).toPromise();
	}
	async savePersonalDelivery(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		let url = this.baseUrl + '/server/package/manual-package-delivery';
		return await this.http.post(url, body, options).toPromise();
	}
	async udpateSchdedulePackage(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		let url = this.baseUrl + '/server/package/update-schedule-package';
		return await this.http.put(url, body, options).toPromise();
	}
	// todo Aun no está funcionando
	async editUser(body, id) {
		let url = this.baseUrl + '/' + id;
		return await this.http.put(url, body).toPromise();
	}
	async getMetrics(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/package/package-metric-locker';
		let data: any = await this.http.get(url, options).toPromise();
		return data.result_metric;
	}
	async camList(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		return await this.http
			.get(this.baseUrl + '/server/locker/cam/list-cam-locker', options)
			.toPromise();
	}
	async camEvent(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		return await this.http
			.get(this.baseUrl + '/server/locker/cam/check-event', options)
			.toPromise();
	}
	async getUserTypes(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		return await this.http
			.get(this.baseUrl + '/server/user/list-type-user', options)
			.toPromise();
	}
	async updateExpirationDate(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
		};
		return await this.http
			.put(
				this.baseUrl + '/server/package/update-expiration-date',
				params,
				options
			)
			.toPromise();
	}
	async getMetricsDash(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/package/metric-dasboard';
		let data: any = await this.http.get(url, options).toPromise();
		return data.metric_return;
	}
	async getMetricsConsumer(params: any) {
		const headers = {
			'Content-Type': 'application/json',
			token: this.getToken(),
		};
		const requestOptions = {
			headers: new HttpHeaders(headers),
			params: params,
		};
		const url = `${this.baseUrl}/server/package/metric-dasboard`;
		const data: any = await this.http.get(url, requestOptions).toPromise();
		return data.metric_return;
	}
	//* Query Comparment   -------------------------------------------------->
	async getCompartment(params: any): Promise<any> {
		let options = { params };
		let url = this.baseUrl + '/server/locker/list-comparment';
		return await this.http.get(url, options).toPromise();
	}
	//* Query locker availables   -------------------------------------------------->
	async listLcokerAvailableComparment(params: any): Promise<any> {
		let options = { params };
		let url = this.baseUrl + '/server/locker/list-lcoker-available-comparment';
		return await this.http.get(url, options).toPromise();
	}
	async saveNotify(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		let url = this.baseUrl + '/server/package/notification-sent-whatsapp';
		return await this.http.post(url, body, options).toPromise();
	}
	getMetricsOfCharts(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: body,
		};
		let url = this.baseUrl + '/server/metric/query-metric-overwiew';
		return this.http.get(url, options);
	}
	async getMetricsOfChartsAsync(body) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: body,
		};
		let url = this.baseUrl + '/server/metric/query-metric-overwiew';
		return await this.http.get(url, options).toPromise();
	}
	getMetricsLockerOrders(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/metric/query-metric-locker';
		return this.http.get(url, options);
	}
	getMetricsLocker(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/metric/query-metric-locker-id';
		return this.http.get(url, options);
	}
	getMetricsOrders(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/metric/query-metric-order';
		return this.http.get(url, options);
	}
	async getMetricsOrdersAsync(params) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/metric/query-metric-order';
		return await this.http.get(url, options).toPromise();
	}
	async getNotifications(params: any): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/logs/log-order';
		return this.http.get(url, options).toPromise();
	}
	async getCarrierData(params: any): Promise<any> {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.getToken(),
			}),
			params: params,
		};
		let url = this.baseUrl + '/server/company/query-carrier';
		return this.http.get(url, options).toPromise();
	}
	async changePasswordService(body: any) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		let url = this.baseUrl + '/server/user/reset-password-user';
		return await this.http.post(url, body, options).toPromise();
	}
}
