/**
 *!	  Componente InputSearchComponent
 *!
 *!	  Este componente representa un campo de búsqueda (input) personalizable, diseñado para permitir la captura
 *!	  de texto de búsqueda y emitir cambios de valor hacia el componente padre.
 *!
 *!	  Propiedades de Entrada:
 *!	    - `filterText` (string): Texto inicial del campo de búsqueda, que puede actualizarse desde el componente padre.
 *!	    - `disabled` (boolean): Desactiva el campo de búsqueda si es `true`.
 *!
 *!	  Propiedades de Salida:
 *!	    - `filterTextChanged` (EventEmitter<string>): Emite el texto actualizado cada vez que cambia el valor del input.
 *!
 *!	  Propiedades Internas:
 *!	    - `ts`: Servicio `TranslateService` inyectado, que se utiliza para traducir texto dentro del componente si es necesario.
 *!
 *!	  Métodos Principales:
 *!	    - `onFilterTextChange(event: Event)`: Método que se ejecuta en respuesta al cambio de texto en el input.
 *!	      Emite el valor actual del input para actualizar el `filterText` en el componente padre.
 *!	    - `onInput(event: Event)`: Método que se ejecuta en tiempo real cada vez que se introduce un carácter en el input.
 *!	      Actualiza la propiedad `filterText` local y emite el valor actualizado a través de `filterTextChanged`.
 *!
 *!	  Ejemplo de Uso:
 *!	  ```html
 *!	  <input-search
 *!	    [filterText]="searchTerm"
 *!	    [disabled]="false"
 *!	    (filterTextChanged)="onSearchChange($event)"
 *!	  ></input-search>
 *!	  ```
 *!
 *!	  Servicios Utilizados:
 *!	    - `TranslateService`: Servicio de traducción para manejar la internacionalización del texto del input si es necesario.
 *!
 *!	  Desarrollado por:
 *!	  Alan Cortez
 *!
 *!	  Fecha:
 *!	  30/10/2024
 */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'input-search',
	imports: [CommonModule, FormsModule, TranslatePipe, IconComponent],
	templateUrl: './input-search.component.html',
	styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
	@Input() filterText: string;
	@Input() disabled: boolean = false;
	@Output() filterTextChanged = new EventEmitter<string>();
	public ts = inject(TranslateService);
	onFilterTextChange(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.filterTextChanged.emit(value);
	}
	onInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.filterText = value;
		this.filterTextChanged.emit(value);
	}
}
