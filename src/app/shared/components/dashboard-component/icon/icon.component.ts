import { HttpClient } from '@angular/common/http';
import { Component, Input, inject, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-icon',
	template: '<span style="display: flex;" [innerHTML]="svgIcon"></span>',
})
export class IconComponent implements OnChanges {
	private httpClient = inject(HttpClient);
	private sanitizer = inject(DomSanitizer);

	// Caché estática para evitar múltiples cargas
	private static iconCache: Record<string, string> | null = null;

	@Input() name!: string;
	@Input() color: string = 'currentColor';
	@Input() size:
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl' = 'md';
	@Input() strokeWidth:
		| 'thin'
		| 'regular'
		| 'medium'
		| 'semibold'
		| 'bold'
		| 'extrabold' = 'medium';
	@Input() fillColor?: string;

	public svgIcon: any;

	async ngOnChanges(): Promise<void> {
		if (!this.name) {
			this.svgIcon = '';
			return;
		}

		// Si la caché aún no está poblada, cargar solo una vez
		if (!IconComponent.iconCache) {
			try {
				const iconData = await firstValueFrom(
					this.httpClient.get<{ [key: string]: string }>(
						`../../../../../assets/icons/icons.json`
					)
				);
				IconComponent.iconCache = iconData; // Guardar en caché estática
			} catch (error) {
				console.error('Error al cargar el archivo de íconos:', error);
				return;
			}
		}

		const rawSvg = IconComponent.iconCache[this.name.replace('dotted-', '')];
		if (!rawSvg) {
			console.warn(`Ícono "${this.name}" no encontrado.`);
			return;
		}

		let processedSvg = rawSvg.toString();
		const colorValue = this.color.startsWith('#')
			? this.color
			: `var(--${this.color})`;

		// Aplicar tamaño con estilos CSS
		processedSvg = processedSvg.replace(
			'<svg ',
			`<svg style="width: var(--size-icon-${this.size}); height: var(--size-icon-${this.size});"`
		);

		// Aplicar color y strokeWidth
		if (this.fillColor) {
			const fillColorValue = this.fillColor.startsWith('#')
				? this.fillColor
				: `var(--${this.fillColor})`;
			// Reemplazar stroke, fill y stroke-width en todos los path y elementos dentro del SVG
			processedSvg = processedSvg.replace(
				/stroke=".*?"/g,
				`stroke="${fillColorValue}"`
			);
			processedSvg = processedSvg.replace(
				/fill=".*?"/g,
				`fill="${fillColorValue}"`
			);
			processedSvg = processedSvg.replace(
				/stroke-width=".*?"/g,
				`stroke-width="${this.getStrokeWidth()}"`
			);
		} else {
			processedSvg = processedSvg.replace(
				/stroke=".*?"/g,
				`stroke="${colorValue}" stroke-width="${this.getStrokeWidth()}"`
			);
		}

		// Aplicar línea punteada si es necesario
		if (this.name.startsWith('dotted-')) {
			processedSvg = processedSvg.replace(
				'<path ',
				'<path stroke-dasharray="3 3"'
			);
		}

		this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(processedSvg);
	}

	private getStrokeWidth(): string {
		const strokeMap = {
			extrathin: '0.5',
			thin: '1.25',
			regular: '2',
			medium: '2.25',
			semibold: '2.50',
			bold: '2.75',
			extrabold: '3',
		};
		return strokeMap[this.strokeWidth] || '1.25';
	}
}
