import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UpdateStoreStatusService {
	private updateStoreSubject = new Subject<void>();

	updateStoreStatus$ = this.updateStoreSubject.asObservable();

	updateStoreStatus() {
		this.updateStoreSubject.next();
	}

	updateStatusDisabledStore(assignedResult: any) {
		this.updateStoreSubject.next(assignedResult);
	}

	updateStatusabledStore(assignedResult: any) {
		this.updateStoreSubject.next(assignedResult);
	}
}
