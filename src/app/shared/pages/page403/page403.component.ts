import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/translate/localstorage.service';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { ButtonComponent } from '../../components/dashboard-component/button/button.component';

@Component({
	selector: 'app-page403',
	imports: [ButtonComponent],
	templateUrl: './page403.component.html',
	styleUrl: './page403.component.scss',
})
export class Page403Component {
	public router = inject(Router);
	public localService = inject(LocalStorageService);
	public ts = inject(TranslateService);

	tryToLogin() {
		this.router.navigateByUrl('auth/login');
	}
}
