/**
 *! 	 Componente InputComponent
 *!
 *! 	 Este componente representa un campo de entrada (input) con diversas opciones de personalización.
 *! 	 Permite configurar íconos, texto, tipo de entrada, longitud máxima y mucho más, según las propiedades de entrada.
 *!
 *! 	 Propiedades de Entrada:
 *! 	   - `inputValue` (string): El valor inicial del input, que puede ser actualizado desde el componente padre.
 *! 	   - `showIcon` (boolean): Muestra un ícono a la izquierda del input si es `true`.
 *! 	   - `showPasswordIcon` (boolean): Muestra un ícono para alternar la visibilidad de contraseñas.
 *! 	   - `icon` (string): Nombre del ícono a mostrar junto al input (usado por `IconComponent`).
 *! 	   - `header` (string): Título o encabezado mostrado arriba del input.
 *! 	   - `showError` (boolean): Controla la visibilidad de un mensaje de error.
 *! 	   - `showEraseIcon` (boolean): Muestra un ícono para borrar el contenido del input si es `true`.
 *! 	   - `showTextInside` (boolean): Muestra texto dentro del input (como una etiqueta flotante).
 *! 	   - `textInside` (string): Texto mostrado dentro del input cuando `showTextInside` es `true`.
 *! 	   - `inputType` (string): Tipo de input (`text`, `password`, etc.).
 *! 	   - `error` (string): Mensaje de error a mostrar cuando `showError` es `true`.
 *! 	   - `showFooter` (boolean): Muestra texto de pie de página si es `true`.
 *! 	   - `showIconSearch` (boolean): Muestra un ícono de búsqueda en el input si es `true`.
 *! 	   - `showHeader` (boolean): Controla la visibilidad del encabezado.
 *! 	   - `footerText` (string): Texto de pie de página que se muestra cuando `showFooter` es `true`.
 *! 	   - `required` (boolean): Marca el input como requerido si es `true`.
 *! 	   - `maxLength` (number | null): Límite de caracteres del input. Recorta el texto si excede este valor.
 *! 	   - `tooltip` (any): Información de tooltip que se muestra cuando se hace hover sobre el input.
 *! 	   - `placeholder` (string): Texto de placeholder dentro del input.
 *!
 *! 	 Propiedades de Salida:
 *! 	   - `inputValueChange` (EventEmitter<string>): Emite el valor del input al componente padre al cambiar.
 *!
 *! 	 Propiedades Internas:
 *! 	   - `ts`: Servicio `TranslateService` inyectado, utilizado para traducir el texto de los elementos si es necesario.
 *!
 *! 	 Métodos Principales:
 *! 	   - `ngOnInit()`: Método del ciclo de vida de Angular, ejecutado cuando el componente se inicializa.
 *! 	   - `ngOnChanges()`: Método del ciclo de vida de Angular, ejecutado cuando se detectan cambios en las propiedades de entrada.
 *! 	   - `onInputChange(event: Event)`: Maneja el evento `input`. Actualiza y recorta el valor del input si excede `maxLength`, luego emite el valor modificado.
 *! 	   - `eraseInput()`: Borra el contenido del input y emite un evento para reflejar el cambio.
 *! 	   - `changeInputType()`: Cambia el tipo del input entre `password` y `text`, útil para mostrar/ocultar contraseñas.
 *! 	   - `showInfo()`: Método reservado para manejar la lógica adicional en la visualización de información del input.
 *!
 *! 	 Ejemplo de Uso:
 *! 	 ```html
 *! 	 <app-input
 *! 	   [inputValue]="nombre"
 *! 	   (inputValueChange)="nombre = $event"
 *! 	   [placeholder]="'Nombre'"
 *! 	   [maxLength]="50"
 *! 	   [required]="true"
 *! 	   [showIcon]="true"
 *! 	   [icon]="'user'"
 *! 	 ></app-input>
 *! 	 ```
 *!
 *! 	 Servicios Utilizados:
 *! 	   - `TranslateService`: Servicio para traducir texto según el idioma configurado.
 *!
 *! 	 Desarrollado por:
 *! 	 Alan Cortez
 *!
 *! 	 Fecha:
 *! 	 30/10/2024
 */
import { CommonModule, NgClass, NgIf } from '@angular/common';
import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
	inject,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule } from '@angular/forms';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { IconComponent } from '../icon/icon.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TooltipDirective } from 'src/app/shared/directives/tooltip.directive';
@Component({
	selector: 'app-input',
	imports: [
		NgClass,
		NgIf,
		CommonModule,
		FormsModule,
		TranslatePipe,
		IconComponent,
		TooltipModule,
		// TooltipDirective,
	],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit, OnChanges, ControlValueAccessor  {
	@Input() inputValue: string = ''; // Recibe el valor del input desde el componente padre
	@Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();
	@Input() showIcon: boolean = false;
	@Input() showPasswordIcon: boolean = false;
	@Input() icon: string;
	@Input() header: string;
	@Input() showError: boolean;
	@Input() showEraseIcon: boolean;
	@Input() showTextInside: boolean = false;
	@Input() textInside: string;
	@Input() inputType: string;
	@Input() error: string;
	@Input() showFooter: boolean = false;
	@Input() showIconSearch: boolean = false;
	@Input() showHeader: boolean = true;
	@Input() footerText: string = '';
	@Input() required: boolean = false;
	@Input() maxLength: number | null = null; // Nueva propiedad para el límite de caracteres
	@Input() tooltip;
	@Input() placeholder: string;
	@Input() inputDisabled: boolean = false;
	@Input() haveMaxLength: boolean = false;
	@Input() isEmpty:boolean = false;
	@ViewChild('inputElement') inputElementRef: ElementRef;
	private onChange: any = () => {};
  	private onTouched: any = () => {};

	public ts = inject(TranslateService);

	ngOnInit() {}
	ngAfterViewInit() {
		// Forzar el campo a estar vacío (por si el navegador lo llenó automáticamente)
		if (this.inputElementRef?.nativeElement?.value && this.isEmpty) {
			this.inputElementRef.nativeElement.value = '';
	    }
	}

	ngOnChanges() {}
	writeValue(value: string): void {
		this.inputValue = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	onBlur() {
		this.onTouched();
	}
	onInputChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value;
		if (this.maxLength && value.length > this.maxLength) {
			this.inputValue = value.slice(0, this.maxLength);
		} else {
			this.inputValue = value;
		}
		this.inputValueChange.emit(this.inputValue);
	}
	
	eraseInput() {
		this.inputValue = ''; // Borra el valor del input
		this.inputValueChange.emit(this.inputValue);
	}
	changeInputType() {
		if (this.inputType === 'password') {
			this.inputType = 'text';
		} else if (this.inputType === 'text') {
			this.inputType = 'password';
		}
	}
	showInfo() {}
}
