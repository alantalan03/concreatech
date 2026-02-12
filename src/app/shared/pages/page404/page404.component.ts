import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/translate/localstorage.service';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { ButtonComponent } from '../../components/dashboard-component/button/button.component';

@Component({
	selector: 'app-page404',
	imports: [ButtonComponent],
	templateUrl: './page404.component.html',
	styleUrl: './page404.component.scss',
})
export class Page404Component {
	public router = inject(Router);
	public localService = inject(LocalStorageService);
	public ts = inject(TranslateService);

	continueLocker() {
		this.router.navigateByUrl('dashboard/locker');
	}
	continueOrders() {
		this.router.navigateByUrl('dashboard/orders');
	}
	continueAccount() {
		this.router.navigateByUrl('dashboard/account');
	}
}
