import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class GoogleMapsService {
	public centerMapEvent: EventEmitter<{
		latitude: number;
		longitude: number;
		zoom: number;
	}> = new EventEmitter();
	constructor() {}

	loadGoogleMaps(): Promise<any> {
		const win = window as any;
		const gModule = win.google;
		if (gModule && gModule.maps) {
			return Promise.resolve(gModule.maps);
		}

		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src =
				'https://maps.googleapis.com/maps/api/js?key=' +
				environment.key_google_maps +
				'&libraries=places';
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);

			script.onload = () => {
				const loadedGoogleModule = win.google;
				if (loadedGoogleModule && loadedGoogleModule.maps) {
					resolve(loadedGoogleModule.maps);
				} else {
					reject('Google Map SDK is not Available');
				}
			};
		});
	}
	// Método para geocodificar una dirección (obtener coordenadas a partir de una dirección)
	geocodeLocation(address: string): Promise<google.maps.GeocoderResult> {
		return new Promise((resolve, reject) => {
			const geocoder = new google.maps.Geocoder();
			geocoder.geocode({ address }, (results, status) => {
				if (status === 'OK' && results[0]) {
					resolve(results[0]);
				} else {
					reject(new Error(`Geocode was not successful: ${status}`));
				}
			});
		});
	}
}
