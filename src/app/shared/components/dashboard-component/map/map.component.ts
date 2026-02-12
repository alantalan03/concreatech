import { CommonModule } from '@angular/common';
import {
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
	ViewChild,
	AfterViewInit,
	OnDestroy,
} from '@angular/core';
import { GoogleMapsService } from 'src/app/core/services/google-maps/google-maps.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	imports: [CommonModule],
})
export class MapComponent implements AfterViewInit, OnDestroy, OnInit {
	private themeService = inject(ThemeService);
	private themeSubscription!: Subscription;
	currentTheme = localStorage.getItem('theme');
	@ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
	@Input() center: { lat: number; lng: number } = {
		lat: 25.74682811,
		lng: -100.351334,
	};
	@Input() zoom: number = 12;
	@Output() locationSelected = new EventEmitter<{
		lat: number;
		lng: number;
		address: string;
		city: string;
	}>();

	map!: google.maps.Map;
	marker!: google.maps.Marker;

	constructor(private maps: GoogleMapsService) {}

	ngOnInit(): void {
		this.initMap;
	}
	ngAfterViewInit() {
		this.maps
			.loadGoogleMaps()
			.then((googleMaps) => {
				if (this.mapContainer?.nativeElement) {
					this.initMap(googleMaps);
				}
			})
			.catch((error) => console.error('Error al cargar Google Maps:', error));

		this.themeSubscription = this.themeService.theme$.subscribe((theme) => {
			if (this.map) {
				this.map.setOptions({
					styles: theme === 'dark' ? this.getDarkTheme() : this.getLightTheme(),
				});
			}
		});
	}

	ngOnDestroy() {
		this.themeSubscription?.unsubscribe();
	}

	getDarkTheme() {
		return [
			{
				elementType: 'geometry',
				stylers: [
					{
						color: '#212121',
					},
				],
			},
			{
				elementType: 'labels.icon',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
			{
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#757575',
					},
				],
			},
			{
				elementType: 'labels.text.stroke',
				stylers: [
					{
						color: '#212121',
					},
				],
			},
			{
				featureType: 'administrative',
				elementType: 'geometry',
				stylers: [
					{
						color: '#757575',
					},
				],
			},
			{
				featureType: 'administrative.country',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#9e9e9e',
					},
				],
			},
			{
				featureType: 'administrative.land_parcel',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
			{
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#bdbdbd',
					},
				],
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#757575',
					},
				],
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [
					{
						color: '#181818',
					},
				],
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#616161',
					},
				],
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.stroke',
				stylers: [
					{
						color: '#1b1b1b',
					},
				],
			},
			{
				featureType: 'road',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#2c2c2c',
					},
				],
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#8a8a8a',
					},
				],
			},
			{
				featureType: 'road.arterial',
				elementType: 'geometry',
				stylers: [
					{
						color: '#373737',
					},
				],
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [
					{
						color: '#3c3c3c',
					},
				],
			},
			{
				featureType: 'road.highway.controlled_access',
				elementType: 'geometry',
				stylers: [
					{
						color: '#4e4e4e',
					},
				],
			},
			{
				featureType: 'road.local',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#616161',
					},
				],
			},
			{
				featureType: 'transit',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#757575',
					},
				],
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [
					{
						color: '#000000',
					},
				],
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#3d3d3d',
					},
				],
			},
		];
	}

	private getLightTheme() {
		return []; // Usa el tema por defecto de Google Maps
	}

	/** Inicializa el mapa */
	private initMap(googleMaps: any) {
		if (!this.mapContainer?.nativeElement) {
			console.error('El contenedor del mapa no está disponible.');
			return;
		}

		const themeStyles =
			this.currentTheme === 'dark' ? this.getDarkTheme() : this.getLightTheme();

		this.map = new googleMaps.Map(this.mapContainer.nativeElement, {
			center: this.center,
			zoom: this.zoom,
			streetViewControl: false,
			mapTypeControl: false,
			styles: themeStyles, // Aplicar el tema aquí
		});

		this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
			if (event.latLng) {
				this.placeMarker(event.latLng);
			}
		});
	}

	/** Coloca un marcador y obtiene la dirección */
	private placeMarker(location: google.maps.LatLng) {
		if (this.marker) {
			this.marker.setMap(null);
		}

		this.marker = new google.maps.Marker({ position: location, map: this.map });

		const geocoder = new google.maps.Geocoder();
		geocoder.geocode({ location }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK && results[0]) {
				const address = results[0].formatted_address;
				const cityComponent = results[0].address_components.find((component) =>
					component.types.includes('locality')
				);
				const city = cityComponent ? cityComponent.long_name : '';

				this.locationSelected.emit({
					lat: location.lat(),
					lng: location.lng(),
					address,
					city,
				});
			}
		});
	}
}
