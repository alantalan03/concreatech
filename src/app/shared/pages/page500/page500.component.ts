import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/translate/localstorage.service';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { Location } from '@angular/common';
import { ButtonComponent } from '../../components/dashboard-component/button/button.component';

@Component({
	selector: 'app-page500',
	imports: [ButtonComponent],
	templateUrl: './page500.component.html',
	styleUrl: './page500.component.scss',
})
export class Page500Component {
	public router = inject(Router);
	public localService = inject(LocalStorageService);
	public ts = inject(TranslateService);
	public location = inject(Location);

	continueLocker() {
		this.router.navigateByUrl('dashboard/locker');
	}
	continueOrders() {
		this.router.navigateByUrl('dashboard/orders');
	}
	continueAccount() {
		this.router.navigateByUrl('dashboard/profile');
	}
	goBack(): void {
		this.location.back();
	}
}
