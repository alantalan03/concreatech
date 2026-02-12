import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-input-date',
	templateUrl: './input-date.component.html',
	styleUrls: ['./input-date.component.scss'],
	imports: [CommonModule, TranslatePipe, IconComponent],
})
export class InputDateComponent implements OnInit {
	@Input() placeholder: string = '17/04/2024 - 24/07/2024';
	@Input() inputValue: string = ''; // Recibe el valor del input desde el componente padre
	@Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();
	@Input() maxLength: number | null = null; // Nueva propiedad para el límite de caracteres
	public ts = inject(TranslateService);
	constructor() {}
	ngOnInit() {}
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
}
