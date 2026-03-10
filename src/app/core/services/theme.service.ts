// * Angular
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	openCheckbox: number = 0;
	theme: string;

	private themeSubject = new BehaviorSubject<string>(
		localStorage.getItem('theme') || 'light'
	);
	theme$ = this.themeSubject.asObservable();

	constructor() {
		this.initializeTheme();
	}

	// Cambia el tema y notifica a los suscriptores
	changeMode(theme: string): void {
		const newTheme = theme === 'light' ? 'light' : 'dark';

		localStorage.setItem('theme', newTheme);
		this.themeSubject.next(newTheme); // Emitir el nuevo valor
		this.applyTheme(newTheme);

		if (localStorage.getItem('selectedColor')) {
			if (localStorage.getItem('theme') === 'light') {
				if (localStorage.getItem('selectedColor')) {
					document.body.style.setProperty(
						`--color-chart-50`,
						` var(--${localStorage.getItem('selectedColor')}-50)`
					);
					document.body.style.setProperty(
						`--color-chart-100`,
						`var(--${localStorage.getItem('selectedColor')}-100)`
					);
					document.body.style.setProperty(
						`--color-chart-200`,
						`var(--${localStorage.getItem('selectedColor')}-200)`
					);
					document.body.style.setProperty(
						`--color-chart-300`,
						`var(--${localStorage.getItem('selectedColor')}-300)`
					);
					document.body.style.setProperty(
						`--color-chart-400`,
						`var(--${localStorage.getItem('selectedColor')}-400)`
					);
					document.body.style.setProperty(
						`--color-chart-500`,
						`var(--${localStorage.getItem('selectedColor')}-500)`
					);
					document.body.style.setProperty(
						`--color-chart-600`,
						`var(--${localStorage.getItem('selectedColor')}-600)`
					);
					document.body.style.setProperty(
						`--color-chart-700`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-chart-800`,
						`var(--${localStorage.getItem('selectedColor')}-800)`
					);
					document.body.style.setProperty(
						`--color-chart-900`,
						`var(--${localStorage.getItem('selectedColor')}-900)`
					);
					document.body.style.setProperty(
						`--color-chart-950`,
						`var(--${localStorage.getItem('selectedColor')}-950)`
					);
					document.body.style.setProperty(
						`--color-fg-link`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-btn-primary-enabled`,
						`var(--${localStorage.getItem('selectedColor')}-600)`
					);
					document.body.style.setProperty(
						`--color-btn-primary-hover`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-btn-primary-active`,
						`var(--${localStorage.getItem('selectedColor')}-800)`
					);
					document.body.style.setProperty(
						`--color-btn-secondary-hover`,
						`var(--${localStorage.getItem('selectedColor')}-100)`
					);
					document.body.style.setProperty(
						`--color-btn-secondary-active`,
						`var(--${localStorage.getItem('selectedColor')}-200)`
					);
					document.body.style.setProperty(
						`--color-btn-tertiary-hover`,
						`var(--${localStorage.getItem('selectedColor')}-100)`
					);
					document.body.style.setProperty(
						`--color-btn-tertiary-active`,
						`var(--${localStorage.getItem('selectedColor')}-200)`
					);
					document.body.style.setProperty(
						`--color-btn-link-hover`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-btn-link-active`,
						`var(--${localStorage.getItem('selectedColor')}-800)`
					);

					document.body.style.setProperty(
						`--color-chip-bg-brand`,
						`var(--${localStorage.getItem('selectedColor')}-950)`
					);
					document.body.style.setProperty(
						`--color-chip-fg-brand`,
						`var(--${localStorage.getItem('selectedColor')}-300)`
					);
					document.body.style.setProperty(
						`--color-chip-outline-brand`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
				}
			} else if (localStorage.getItem('theme') === 'dark') {
				if (localStorage.getItem('selectedColor')) {
					document.body.style.setProperty(
						`--color-chart-50`,
						` var(--${localStorage.getItem('selectedColor')}-950)`
					);
					document.body.style.setProperty(
						`--color-chart-100`,
						`var(--${localStorage.getItem('selectedColor')}-900)`
					);
					document.body.style.setProperty(
						`--color-chart-200`,
						`var(--${localStorage.getItem('selectedColor')}-800)`
					);
					document.body.style.setProperty(
						`--color-chart-300`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-chart-400`,
						`var(--${localStorage.getItem('selectedColor')}-600)`
					);
					document.body.style.setProperty(
						`--color-chart-500`,
						`var(--${localStorage.getItem('selectedColor')}-500)`
					);
					document.body.style.setProperty(
						`--color-chart-600`,
						`var(--${localStorage.getItem('selectedColor')}-400)`
					);
					document.body.style.setProperty(
						`--color-chart-700`,
						`var(--${localStorage.getItem('selectedColor')}-300)`
					);
					document.body.style.setProperty(
						`--color-chart-800`,
						`var(--${localStorage.getItem('selectedColor')}-200)`
					);
					document.body.style.setProperty(
						`--color-chart-900`,
						`var(--${localStorage.getItem('selectedColor')}-100)`
					);
					document.body.style.setProperty(
						`--color-chart-950`,
						`var(--${localStorage.getItem('selectedColor')}-50)`
					);
					document.body.style.setProperty(
						`--color-fg-link`,
						`var(--${localStorage.getItem('selectedColor')}-400)`
					);
					document.body.style.setProperty(
						`--color-btn-primary-enabled`,
						`var(--${localStorage.getItem('selectedColor')}-500)`
					);
					document.body.style.setProperty(
						`--color-btn-primary-hover`,
						`var(--${localStorage.getItem('selectedColor')}-400)`
					);
					document.body.style.setProperty(
						`--color-btn-primary-active`,
						`var(--${localStorage.getItem('selectedColor')}-950)`
					);
					document.body.style.setProperty(
						`--color-btn-secondary-hover`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-btn-secondary-active`,
						`var(--${localStorage.getItem('selectedColor')}-900)`
					);
					document.body.style.setProperty(
						`--color-btn-tertiary-hover`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-btn-tertiary-active`,
						`var(--${localStorage.getItem('selectedColor')}-800)`
					);
					document.body.style.setProperty(
						`--color-btn-link-hover`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
					document.body.style.setProperty(
						`--color-btn-link-active`,
						`var(--${localStorage.getItem('selectedColor')}-800)`
					);

					document.body.style.setProperty(
						`--color-chip-bg-brand`,
						`var(--${localStorage.getItem('selectedColor')}-950)`
					);
					document.body.style.setProperty(
						`--color-chip-fg-brand`,
						`var(--${localStorage.getItem('selectedColor')}-300)`
					);
					document.body.style.setProperty(
						`--color-chip-outline-brand`,
						`var(--${localStorage.getItem('selectedColor')}-700)`
					);
				}
			}
		}
	}

	// Cambiar al modo claro
	enableLightMode() {
		document.body.classList.remove('dark-mode');
		document.body.classList.add('light-mode');
	}

	// Cambiar al modo oscuro
	enableDarkMode() {
		document.body.classList.remove('light-mode');
		document.body.classList.add('dark-mode');
	}

	// Inicializa el tema guardado en localStorage
	initializeTheme(): void {
		const savedTheme = localStorage.getItem('theme') || 'light';
		this.themeSubject.next(savedTheme);
		this.applyTheme(savedTheme);
	}

	// Método privado para aplicar clases de tema
	private applyTheme(theme: string): void {
		// document.body.classList.toggle('theme--dark', theme === 'dark');
		document.body.classList.toggle('theme--light', theme === 'light');
	}
	onThemeChange(callback: (theme: string) => void) {
		this.theme$.subscribe(callback);
	}
}
