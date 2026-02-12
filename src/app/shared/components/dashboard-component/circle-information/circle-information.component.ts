import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-circle-information',
	imports: [IconComponent],
	templateUrl: './circle-information.component.html',
	styleUrl: './circle-information.component.scss',
})
export class CircleInformationComponent {
	@Input() type: 'success' | 'info' | 'danger' | 'warning' = 'success';
	@Input() icon: string;

	// Mapeo de colores basado en el tipo de input
	get borderColor(): string {
		switch (this.type) {
			case 'danger':
				return '--color-system-danger';
			case 'warning':
				return '--color-system-warning';
			case 'info':
				return '--color-system-info';
			default:
				return '--color-system-success';
		}
	}
	// Mapeo de colores basado en el tipo de input
	get iconColor(): string {
		switch (this.type) {
			case 'danger':
				return 'color-system-danger';
			case 'warning':
				return 'color-system-warning';
			case 'info':
				return 'color-system-info';
			default:
				return 'color-system-success';
		}
	}
	/**
	 * Devuelve el color a partir de una variable CSS personalizada.
	 * @param colorVariable - El nombre de la variable de color (ej. '--color-system-success').
	 * @param shade - El nivel de opacidad o variante (ej. '100', '200', '300').
	 */
	getComputedColor(colorVariable: string, shade: string): string {
		return `1px solid var(${colorVariable}-${shade})`;
	}
	/**
	 * Devuelve el color a partir de una variable CSS personalizada.
	 * @param colorVariable - El nombre de la variable de color (ej. '--color-system-success').
	 * @param shade - El nivel de opacidad o variante (ej. '100', '200', '300').
	 */
	getComputedColorIcon(colorVariable: string, shade: string): string {
		return `${colorVariable}-${shade}`;
	}
}
