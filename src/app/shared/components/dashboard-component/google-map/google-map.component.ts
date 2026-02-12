/**
 *!	 Componente GoogleMapComponent
 *!
 *!	 Este componente integra un mapa de Google Maps y permite mostrar marcadores de ubicaciones, además de ubicar la posición actual del usuario si está disponible.
 *!
 *!	 Propiedades de Entrada:
 *!	   - `lockers` (Input): Lista de objetos de ubicaciones de lockers, con propiedades como `latitude` y `longitude` para marcar en el mapa.
 *!	   - `searchLocation` (Input): Dirección o nombre de lugar para centrar el mapa.
 *!
 *!	 Propiedades de Salida:
 *!	   - `lockerSelected` (Output): Emite el locker seleccionado cuando el usuario hace clic en un marcador.
 *!	   - `locationUpdated` (Output): Emite las coordenadas (latitud y longitud) de una ubicación buscada y geocodificada.
 *!
 *!	 Variables Internas:
 *!	   - `map`: Mapa de Google Maps.
 *!	   - `markers`: Lista de marcadores de Google Maps.
 *!	   - `currentLat`, `currentLng`: Coordenadas de la ubicación actual del dispositivo.
 *!
 *!	 Métodos Principales:
 *!	   - `ngOnInit()`: Carga el servicio de Google Maps y solicita la ubicación actual del usuario. Inicializa el mapa en función de los resultados.
 *!	   - `ngOnChanges(changes: SimpleChanges)`: Detecta cambios en `lockers` o `searchLocation` y actualiza el mapa en consecuencia.
 *!	   - `initializeMap(maps: any)`: Configura el mapa con opciones predeterminadas y estilos personalizados.
 *!	   - `updateMapLocation(location: string)`: Geocodifica una ubicación proporcionada y actualiza la posición del mapa.
 *!	   - `updateMarkers()`: Actualiza los marcadores en el mapa según las ubicaciones de lockers y calcula la distancia desde el centro del mapa.
 *!	   - `calculateDistance(lat1, lng1, lat2, lng2)`: Calcula la distancia entre dos puntos en kilómetros.
 *!	   - `getCurrentLocation()`: Solicita la ubicación actual del dispositivo.
 *!
 *!	 Decoradores y Componentes Importados:
 *!	   - `selector`: Define el selector del componente (`app-google-map`).
 *!	   - `standalone`: Permite que el componente sea usado de manera independiente.
 *!	   - `imports`: Incluye módulos necesarios.
 *!
 *!	 Ejemplo de Uso:
 *!	 ```html
 *!	 <app-google-map [lockers]="lockerList" [searchLocation]="desiredLocation"
 *!	     (lockerSelected)="onLockerSelected($event)" (locationUpdated)="onLocationUpdated($event)">
 *!	 </app-google-map>
 *!	 ```
 *!
 *!	 Desarrollado por:
 *!	 Alan Cortez
 *!
 *!	 Fecha:
 *!	 30/10/2024
 */
import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Input,
	SimpleChanges,
	OnChanges,
	Output,
	EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { GoogleMapsService } from 'src/app/core/services/google-maps/google-maps.service';

@Component({
	selector: 'app-google-map',
	templateUrl: './google-map.component.html',
	styleUrls: ['./google-map.component.scss'],
	standalone: true,
})
export class GoogleMapComponent implements OnInit, OnChanges {
	@ViewChild('google_map', { static: true }) mapElement: ElementRef;
	@Input() lockers: any[] = [];
	@Input() searchLocation: string = '';
	@Output() lockerSelected = new EventEmitter<any>();
	@Output() locationUpdated = new EventEmitter<any>();
	map: google.maps.Map;
	markers: google.maps.Marker[] = [];
	private destroy$ = new Subject<void>();
	private currentLat: number;
	private currentLng: number;

	constructor(private mapsService: GoogleMapsService) {}

	ngOnInit(): void {
		this.mapsService
			.loadGoogleMaps()
			.then((maps) => {
				// Obtener la ubicación actual del dispositivo
				this.getCurrentLocation()
					.then((position) => {
						this.currentLat = position.coords.latitude;
						this.currentLng = position.coords.longitude;
						this.initializeMap(maps); // Inicializar el mapa con la ubicación actual
					})
					.catch((error) => {
						console.error('Error getting location:', error);
						this.initializeMap(maps); // Inicializar el mapa sin la ubicación actual
					});
				this.initializeMap(maps);
			})
			.catch((error) => {
				console.error('Error loading Google Maps:', error);
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['searchLocation']) {
			this.updateMapLocation(changes['searchLocation'].currentValue);
		}
		if (changes['lockers'] && this.map) {
			this.updateMarkers();
		}
	}
	updateMapLocation(location: string) {
		if (!location) return;
		this.mapsService
			.geocodeLocation(location)
			.then((result) => {
				if (result) {
					// Invocamos las funciones lat() y lng() para obtener los valores numéricos
					const lat = result.geometry.location.lat();
					const lng = result.geometry.location.lng();
					this.locationUpdated.emit({
						latitud: lat,
						longitud: lng,
					});
					// Establecemos el centro del mapa con los valores numéricos
					this.map.setCenter({ lat, lng });

					this.updateMarkers();
				}
			})
			.catch((error) => {
				console.error('Error fetching location:', error);
			});
	}
	initializeMap(maps: any) {
		const mapOptions: google.maps.MapOptions = {
			center: { lat: 25.74277021, lng: -100.21699212 },
			zoom: 14,
			scaleControl: true,
			streetViewControl: false,
			zoomControl: true,
			mapTypeControl: false,
			fullscreenControl: false,
			mapTypeId: 'terrain', // Habilitar la vista de terreno para mostrar relieves
			styles: [
				{
					elementType: 'geometry',
					stylers: [{ color: '#DFDCD6' }],
				},
				{
					elementType: 'labels.icon',
					stylers: [{ visibility: 'on' }],
				},
				// {
				// 	elementType: 'labels.text.fill',
				// 	stylers: [{ color: '#616161' }],
				// },
				// {
				// 	elementType: 'labels.text.stroke',
				// 	stylers: [{ color: '#f5f5f5' }],
				// },
				{
					featureType: 'landscape.natural',
					elementType: 'geometry',
					stylers: [{ color: '#B7D59F' }],
				},
				{
					featureType: 'administrative.land_parcel',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#B1CD97' }],
				},
				{
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [{ color: '#B1CD97' }],
				},
				{
					featureType: 'poi',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#B1CD97' }],
				},
				{
					featureType: 'poi.park',
					elementType: 'geometry',
					stylers: [{ color: '#B6E59E' }],
				},
				{
					featureType: 'poi.park',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#A4A9BC' }],
				},
				{
					featureType: 'road',
					elementType: 'geometry',
					stylers: [{ color: '#ffffff' }],
				},
				{
					featureType: 'road.arterial',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#757575' }],
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry',
					stylers: [{ color: '#F2D163' }],
				},
				{
					featureType: 'road.highway',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#101828' }],
				},
				{
					featureType: 'road.local',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#9e9e9e' }],
				},
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [{ color: '#75CEF0' }],
				},
				{
					featureType: 'water',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#75CEF0' }],
				},
				{
					featureType: 'transit.line',
					elementType: 'geometry',
					stylers: [{ color: '#e5e5e5' }],
				},
				{
					featureType: 'transit.station',
					elementType: 'geometry',
					stylers: [{ color: '#eeeeee' }],
				},
			],
		};

		this.map = new maps.Map(this.mapElement.nativeElement, mapOptions);

		this.updateMarkers();
	}

	updateMarkers() {
		if (!this.map) {
			console.error('Map is not initialized.');
			return;
		}

		this.markers.forEach((marker) => marker.setMap(null));
		this.markers = [];

		const centerLat = this.map.getCenter().lat();
		const centerLng = this.map.getCenter().lng();

		this.lockers.forEach((locker) => {
			const lockerLat = parseFloat(locker.latitude);
			const lockerLng = parseFloat(locker.logitude);
			const distance = this.calculateDistance(
				centerLat,
				centerLng,
				lockerLat,
				lockerLng
			);

			const marker = new google.maps.Marker({
				position: { lat: lockerLat, lng: lockerLng },
				map: this.map,
				title: `${locker.locker_name} - ${Math.round(distance)} meters`,
			});

			marker.addListener('click', () => {
				this.lockerSelected.emit({
					...locker,
					distance: Math.round(distance), // Add distance to locker object
				});
			});

			this.markers.push(marker);
		});
	}
	private calculateDistance(
		lat1: number,
		lng1: number,
		lat2: number,
		lng2: number
	): number {
		const toRad = (value: number) => (value * Math.PI) / 180;
		const R = 6371; // Radio de la Tierra en kilómetros
		const dLat = toRad(lat2 - lat1);
		const dLng = toRad(lng2 - lng1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) *
				Math.cos(toRad(lat2)) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c; // Distancia en kilómetros
	}
	// Solicitar la ubicación actual del dispositivo
	private getCurrentLocation(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			} else {
				reject(new Error('Geolocation is not supported by this browser.'));
			}
		});
	}
}
