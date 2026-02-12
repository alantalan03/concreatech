import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
	providedIn: 'root',
})
export class SharedService {
	private readonly subject = new Subject<any>();

	sendClickEvent(lat, lng, zoom) {
		const data_google_map = new dataGoogleMap();
		data_google_map.lat = lat;
		data_google_map.lng = lng;
		data_google_map.zoom = zoom;
		this.subject.next(data_google_map);
	}
	getClickEvent(): Observable<any> {
		return this.subject.asObservable();
	}
}
export class dataGoogleMap {
	public lat: Text;
	public lng: Text;
	public zoom: number;
}
