/**
 *!	 	Componente CloseButtonComponent
 *!		  Este componente representa un botón de cierre (close button) que se utiliza
 *!		  para cerrar modales, menús o cualquier otro elemento que requiera una
 *!		  acción de cierre por parte del usuario.
 *!
 *!		 Importaciones:
 *!		 	- IconComponent: Componente utilizado para mostrar un ícono junto al texto
 *!		 		del botón, si es necesario.
 *!
 *!		 Uso:
 *!	 	<app-close-button></app-close-button>
 *!
 *!		 Desarrollado por:
 *!	 	Alan Cortez
 *!
 *!		 Fecha:
 *!	 	30/10/2024
 */
import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
@Component({
	selector: 'app-close-button',
	imports: [IconComponent],
	templateUrl: './close-button.component.html',
	styleUrl: './close-button.component.scss',
})
export class CloseButtonComponent {}
