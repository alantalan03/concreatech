import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
	private readonly supportedLocales = ['es-ES', 'en-US'];
	private readonly defaultLocale = 'es-ES';

	private localeSubject = new BehaviorSubject<string>(this.getInitialLocale());
	readonly locale$: Observable<string> = this.localeSubject.asObservable();

	constructor() {}

	changeLocale(locale: string): void {
		if (!this.isValidLocale(locale)) {
			console.warn(`Locale no soportado: ${locale}`);
			return;
		}
		this.localeSubject.next(locale);
		localStorage.setItem('appLocale', locale);
	}

	get currentLocale(): string {
		return this.localeSubject.getValue();
	}

	getLocale(): string {
		return this.currentLocale;
	}

	private isValidLocale(locale: string): boolean {
		return this.supportedLocales.includes(locale);
	}

	private getInitialLocale(): string {
		const savedLocale = localStorage.getItem('appLocale');
		return savedLocale && this.isValidLocale(savedLocale)
			? savedLocale
			: this.defaultLocale;
	}
}
