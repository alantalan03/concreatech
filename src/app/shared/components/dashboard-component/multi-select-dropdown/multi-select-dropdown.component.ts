import { CommonModule, NgIf } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	Output,
	forwardRef,
	inject,
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
@Component({
	selector: 'app-multi-select-dropdown',
	templateUrl: './multi-select-dropdown.component.html',
	styleUrls: ['./multi-select-dropdown.component.scss'],
	imports: [NgIf, CommonModule, IconComponent, TranslatePipe],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MultiSelectDropdownComponent),
			multi: true,
		},
	],
})
export class MultiSelectDropdownComponent<T = any>
	implements ControlValueAccessor
{
	@Input() control: AbstractControl | null = null;
	@Input() items: T[] = [];
	@Input() title: string;
	@Input() displayKey: keyof T | null = null;
	@Input() valueKey: keyof T | null = null;
	@Input() placeholder: string = 'Seleccione una opción';
	@Input() showTitleContainer: boolean = false;
	@Input() disabled: boolean = false;
	@Input() required: boolean = false;
	@Output() itemsSelected: EventEmitter<T[]> = new EventEmitter<T[]>();

	public ts = inject(TranslateService);
	isDropdownOpen: boolean = false;
	selectedItems: T[] = [];

	// Métodos para ControlValueAccessor
	onTouched: () => void = () => {};
	onChange: (value: any) => void = () => {};

	toggleDropdown() {
		if (!this.disabled) {
			this.isDropdownOpen = !this.isDropdownOpen;
		}
	}

	selectItem(item: T) {
		if (!this.disabled) {
			const index = this.selectedItems.findIndex(
				(selected) => selected === item
			);
			if (index > -1) {
				this.selectedItems.splice(index, 1); // Deseleccionar si ya está
			} else {
				this.selectedItems.push(item); // Agregar si no está
			}
			this.itemsSelected.emit(this.selectedItems);
			this.onChange(this.selectedItems);
		}
	}

	getSelectedText(): string {
		if (this.selectedItems.length > 0 && this.displayKey) {
			return this.selectedItems
				.map((item) => item[this.displayKey] as string)
				.join(', ');
		}
		return this.placeholder;
	}

	// Métodos del ControlValueAccessor
	writeValue(value: any): void {
		this.selectedItems = value || [];
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
