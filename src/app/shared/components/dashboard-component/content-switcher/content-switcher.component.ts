/**
 *!	 	Componente ContentSwitcherComponent
 *!		  Este componente permite al usuario alternar entre diferentes contenidos
 *!		  de una lista. El usuario puede seleccionar un contenido, y el componente
 *!		  emitirá un evento con el contenido seleccionado.
 *!
 *!		 Propiedades:
 *!		 	- content: Array de objetos que representan los contenidos disponibles
 *!		 		para la selección.
 *!		 	- showNumber: Booleano que indica si se deben mostrar números junto
 *!		 		a los contenidos.
 *!		 	- contentSelected: Evento que se emite al seleccionar un contenido,
 *!		 		proporcionando el contenido seleccionado al componente padre.
 *!
 *!		 Métodos:
 *!		 	- selectContent(item): Método que permite seleccionar un contenido y
 *!		 		emitir el evento correspondiente.
 *!
 *!		 Uso:
 *!	 	<app-content-switcher [content]="contentList" (contentSelected)="onContentSelected($event)"></app-content-switcher>
 *!
 *!		 Desarrollado por:
 *!	 	Alan Cortez
 *!
 *!		 Fecha:
 *!	 	30/10/2024
 */
import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	inject,
} from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
@Component({
	selector: 'app-content-switcher',
	imports: [CommonModule, TranslatePipe],
	templateUrl: './content-switcher.component.html',
	styleUrl: './content-switcher.component.scss',
})
export class ContentSwitcherComponent implements OnInit {
	@Input() content = [];
	@Input() showNumber: boolean = true;
	@Output() contentSelected = new EventEmitter<any>(); // Evento de salida para notificar la selección de contenido
	selectedContent: any;
	public ts = inject(TranslateService);

	ngOnInit() {}
	selectContent(item: any) {
		// Iterate through content array and set selected property accordingly
		this.content.forEach((contentItem) => {
			contentItem.selected = contentItem === item;
		});
		if (this.selectedContent !== item) {
			this.selectedContent = item;
			// Emitir el evento de selección solo si es un contenido diferente
			this.contentSelected.emit(this.selectedContent);
		}
	}
}
