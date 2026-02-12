import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { TranslateService } from '../translate/translate.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BrandingService {
	public ts = inject(TranslateService);

	private baseUrl: string = environment.url_server_backend + 'v1/';
	temp: string;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'vivi-client-name': 'return-portal',
			// 'Origin':'https://sally.com',
			authorization: 'Bearer ' + localStorage.getItem('token'),
		}),
	};
	constructor(private http: HttpClient) {}

	// Método para obtener productos con paginación
	getBranding(): Observable<any> {
		const lang = 'en'; // Puedes obtener este valor dinámicamente
		const url = `${this.baseUrl}return-service/partner/custom-branding`;

		// Crear parámetros para la URL
		let params = new HttpParams().set('lang', lang);

		// Realizar la solicitud GET con los parámetros
		return this.http
			.get(url, {
				...this.httpOptions, // Opciones de encabezados
				params, // Parámetros para la URL
			})
			.pipe(
				map((response) => response),
				catchError((error) => {
					console.error('Error al obtener productos', error);
					return of(error.error);
				})
			);
	}
}
