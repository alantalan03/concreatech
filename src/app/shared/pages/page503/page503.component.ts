import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/translate/localstorage.service';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { Location } from '@angular/common';
import { ButtonComponent } from '../../components/dashboard-component/button/button.component';

@Component({
	selector: 'app-page503',
	imports: [ButtonComponent],
	templateUrl: './page503.component.html',
	styleUrl: './page503.component.scss',
})
export class Page503Component {
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
		this.router.navigateByUrl('dashboard/account');
	}

	goBack(): void {
		this.location.back();
	}
}
