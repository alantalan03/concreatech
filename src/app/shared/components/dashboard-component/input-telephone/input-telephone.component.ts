import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	inject,
	Input,
	NgModule,
	OnInit,
	Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';

@Component({
	selector: 'app-input-telephone',
	templateUrl: './input-telephone.component.html',
	styleUrls: ['./input-telephone.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, TranslatePipe],
})
export class InputTelephoneComponent implements OnInit {
	public ts = inject(TranslateService);

	@Input() required: boolean = false;
	@Input() initialPhone: string = ''; // Recibe el valor del número de teléfono
	@Input() disabled: boolean = false; // Nueva propiedad para deshabilitar el input
	@Output() phoneChange = new EventEmitter<string>();

	countries = [
		{ name: 'México', code: '+52' },
		{ name: 'Estados Unidos', code: '+1' },
		{ name: 'España', code: '+34' },
	];

	selectedCountryCode = '+52';
	phoneNumber = '';

	ngOnInit(): void {
		if (this.initialPhone) {
			this.setInitialPhone();
		}
	}

	setInitialPhone() {
		const country = this.countries.find((c) =>
			this.initialPhone.startsWith(c.code)
		);
		if (country) {
			this.selectedCountryCode = country.code;
			this.phoneNumber = this.initialPhone.replace(country.code, '');
		} else {
			this.phoneNumber = this.initialPhone;
		}
	}

	onPhoneChange(): void {
		if (!this.disabled) {
			const trimmedPhone = this.phoneNumber.trim();
			if (/^\d{7,10}$/.test(trimmedPhone)) {
				// Validando que sea un número razonable
				this.phoneChange.emit(this.selectedCountryCode + trimmedPhone);
			}
		}
	}
}
