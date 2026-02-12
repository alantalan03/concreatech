import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[numericOnly]',
	standalone: true,
})
export class NumericOnlyDirective {
	constructor(private el: ElementRef) {}

	@HostListener('input', ['$event'])
	onInput(event: Event): void {
		const input = event.target as HTMLInputElement;

		// Obtener la posición actual del cursor
		const cursorPosition = input.selectionStart || 0;

		// Eliminar cualquier carácter que no sea un número
		let cleanValue = input.value.replace(/[^0-9]/g, '');

		// Formatear el valor en grupos de 4 dígitos separados por un guion
		let formattedValue = cleanValue.replace(/(.{4})/g, '$1-');

		// Eliminar el último guion si el valor termina con uno
		if (formattedValue.endsWith('-')) {
			formattedValue = formattedValue.slice(0, -1);
		}

		// Actualizar el valor del input solo si es diferente
		if (input.value !== formattedValue) {
			input.value = formattedValue;

			// // Restaurar la posición del cursor, para que el guion no lo mueva de manera incómoda
			// input.setSelectionRange(cursorPosition, cursorPosition);
		}
	}
}
