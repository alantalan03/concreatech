import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
	// * To callapse
	collapse: boolean = false;

	private updateSideBarSubject = new Subject<void>();

	updateSidebar$ = this.updateSideBarSubject.asObservable();

	updateSidebar() {
		this.updateSideBarSubject.next();
	}
}
