import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ChangePersonToDeliverService {
	private updateOrderToDeliverSubject = new Subject<void>();
	updateOrderToDeliver$ = this.updateOrderToDeliverSubject.asObservable();
	updateOrderToDeliverMethod() {
		this.updateOrderToDeliverSubject.next();
	}
	updateClient(newClient: any) {
		this.updateOrderToDeliverSubject.next(newClient);
	}
}
