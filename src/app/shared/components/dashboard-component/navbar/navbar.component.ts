import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/translate/language.service';
import { ButtonComponent } from '../button/button.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule,
		ButtonComponent,
		LanguageSelectorComponent,
	],
	standalone: true,
})
export class NavbarComponent {
	langOpen = false;
	menuOpen = false;

	constructor(public langService: LanguageService) {}

	toggleLang() {
		this.langOpen = !this.langOpen;
	}

	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}

	closeMenu() {
		this.menuOpen = false;
	}

	changeLang(lang: 'es' | 'en') {
		this.langService.setLang(lang);
		this.closeMenu();
	}
}
