import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class ValidatorsService {
	public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
	public namePattern: string = '([a-zA-Z]+)';
	public usernamePattern: string = '([a-zA-Z0-9._%+-]+)';

	constructor() {}

	noSePuedeRepetir(control: FormControl): ValidationErrors | null {
		const valor: string = control.value?.trim().toLowerCase();
		if (valor === 'repetido') {
			return {
				noRepetir: true,
			};
		}

		return null;
	}

	camposIguales(campo1: string, campo2: string) {
		return (formGroup: AbstractControl): ValidationErrors | null => {
			const pass1 = formGroup.get(campo1)?.value;
			const pass2 = formGroup.get(campo2)?.value;

			if (pass1 !== pass2) {
				formGroup.get(campo2)?.setErrors({ noIguales: true });
				return { noIguales: true };
			}

			// !ADVERTENCIA: Si tenemos otras validaciones este setErrors(null) los eliminara
			formGroup.get(campo2)?.setErrors(null);

			return null;
		};
	}
}
