/**
 *!	 Componente LinkComponent
 *!
 *!	 Este componente representa un enlace (link) que puede redirigir a otras páginas de la aplicación.
 *!	 Está diseñado para ser utilizado donde se requiere la navegación, y ofrece opciones de texto
 *!	 y tipo de enlace configurables.
 *!
 *!	 Propiedades de Entrada:
 *!	   - `text` (string): El texto que se mostrará para el enlace. Por defecto es una cadena vacía.
 *!	   - `url` (string): La URL o ruta a la que se redirigirá cuando se haga clic en el enlace.
 *!	   - `linkType` (string): Indica el tipo de enlace. Si se establece en 'disabled', el enlace no redirigirá.
 *!
 *!	 Propiedades Internas:
 *!	   - `ts`: Servicio `TranslateService` inyectado, que se utiliza para traducir el texto del enlace si es necesario.
 *!	   - `router`: Servicio `Router` inyectado, utilizado para manejar la navegación dentro de la aplicación.
 *!
 *!	 Métodos Principales:
 *!	   - `redirectToPage()`: Método que se ejecuta al hacer clic en el enlace. Verifica el tipo de enlace
 *!	     y redirige a la URL especificada si `linkType` no es 'disabled'.
 *!
 *!	 Ejemplo de Uso:
 *!	 ```html
 *!	 <app-link-component
 *!	   [text]="'Click here'"
 *!	   [url]="'/home'"
 *!	   [linkType]="'enabled'"
 *!	 ></app-link-component>
 *!	 ```
 *!
 *!	 Servicios Utilizados:
 *!	   - `TranslateService`: Servicio de traducción para manejar la internacionalización del texto del enlace si es necesario.
 *!	   - `Router`: Servicio de Angular para manejar la navegación entre diferentes rutas de la aplicación.
 *!
 *!	 Desarrollado por:
 *!	 Alan Cortez
 *!
 *!	 Fecha:
 *!	 30/10/2024
 */
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { link } from 'fs';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';

@Component({
	selector: 'app-link',
	imports: [CommonModule, RouterModule, TranslatePipe],
	templateUrl: './link.component.html',
	styleUrl: './link.component.scss',
})
export class LinkComponent {
	public ts = inject(TranslateService);
	public router = inject(Router);
	@Input() text: string = '';
	@Input() url: string = '';
	@Input() linkType: string = '';

	redirectToPage() {
		if (this.linkType !== 'disabled') {
			this.router.navigateByUrl('' + this.url);
		}
	}
}
