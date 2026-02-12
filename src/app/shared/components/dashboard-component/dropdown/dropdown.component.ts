// <app-dropdown style="width: 100%;"
// [items]="cities"
// [showTitleContainer]="true"
// [disabled]="false"
// [displayKey]="'name'"
// [valueKey]="'id'"
// placeholder="Seleccione una ciudad"
// (itemSelected)="onCitySelected($event)">
// </app-dropdown>
import { CommonModule, NgIf } from '@angular/common';
import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	ViewChild,
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
import { HostListener } from '@angular/core';
@Component({
	selector: 'app-dropdown',
	imports: [NgIf, CommonModule, IconComponent, TranslatePipe],
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DropdownComponent),
			multi: true,
		},
	],
})
export class DropdownComponent<T = any>
	implements ControlValueAccessor, OnChanges
{
	@Input() control: AbstractControl | null = null;
	@Input() items: T[] = [];
	@Input() title: string;
	@Input() displayKey: keyof T | null = null;
	@Input() valueKey: keyof T | null = null;
	@Input() placeholder: string = '';
	@Input() showTitleContainer: boolean = false;
	@Input() showError: boolean = false;
	@Input() disabled: boolean = false;
	@Input() required: boolean = false;
	@Output() itemSelected: EventEmitter<T> = new EventEmitter<T>();
	@Input() selectedItem?: T; // Nueva propiedad para selección inicial
	@Input() valueItem?: string;
	@Input() errorMessage: string = 'Selecciona una opción válida';
	@Input() showIcon: boolean = false;
	@Input() icon: string;
	@Input() showFooter:boolean = false;
	@Input() footerText:string = '';
	// ✅ activar/desactivar buscador y placeholder
	@Input() enableSearch: boolean = true;
	@Input() searchPlaceholder: string = 'Buscar…';
	// ✅ refs y estado de búsqueda
	@ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
	searchTerm: string = '';
	filteredItems: T[] = [];

	public ts = inject(TranslateService);

	isDropdownOpen: boolean = false;
	selectedIndex: number = -1;

	// Función para marcar la propiedad como "touched" (usada por los formularios)
	onTouched: () => void = () => {};

	// Función para propagar el valor hacia el formulario
	onChange: (value: any) => void = () => {};
	ngOnChanges() {
		 // conserva tu comportamiento previo
		if (this.selectedItem && this.valueKey) {
		this.writeValue(this.selectedItem[this.valueKey]);
		}
		// ✅ inicializa/actualiza lista filtrada cada vez que cambian items o selected
		this.applyFilter();
	}
	toggleDropdown() {
		if (!this.disabled) {
			this.isDropdownOpen = !this.isDropdownOpen;
			if (this.isDropdownOpen) {
				// enfoca el input al abrir
				setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
			}
		}
	}

	// ✅ normaliza texto (minúsculas, sin acentos)
	private norm(v: any): string {
		return String(v ?? '')
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();
	}

	// ✅ aplica filtro por displayKey (o 'text' por defecto)
	applyFilter(): void {
		const key = (this.displayKey ?? ('text' as keyof T)) as keyof T;
		const term = this.norm(this.searchTerm);

		if (!term) {
		this.filteredItems = this.items?.slice() ?? [];
		} else {
		this.filteredItems = (this.items ?? []).filter((it: any) =>
			this.norm(it?.[key]).includes(term)
		);
		}

		// opcional: posicionar selección
		this.selectedIndex = this.filteredItems.length ? 0 : -1;
	}

	trackByValue = (_: number, item: any) => {
		return this.valueKey ? item[this.valueKey] : item;
	};
		
	// ✅ evento de input del buscador
	onSearch(value: string) {
		this.searchTerm = value;
		this.applyFilter();
	}

	// ✅ Enter: si hay un único match, selección directa
	onEnterSearch() {
		if (this.filteredItems.length === 1) {
		this.selectItem(this.filteredItems[0], 0);
		} else if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredItems.length) {
		this.selectItem(this.filteredItems[this.selectedIndex], this.selectedIndex);
		}
	}

	// 🔁 usa filteredItems para navegación por teclado



	// ⚠️ al seleccionar, el índice viene de filteredItems
	selectItem(item: T, index: number) {
		if (!this.disabled) {
			this.selectedItem = item;
			this.selectedIndex = index;
			this.itemSelected.emit(this.selectedItem);
			this.onChange(this.valueKey ? (item as any)[this.valueKey] : item);
			this.isDropdownOpen = false;
			this.searchTerm = '';       // limpia búsqueda al cerrar (opcional)
			this.applyFilter();         // restaura lista completa
		}
	}

	getSelectedText(): string {
		if (this.selectedItem && this.displayKey) {
			return this.selectedItem[this.displayKey] as unknown as string;
		}
		return this.placeholder;
	}

	// Métodos del ControlValueAccessor
	writeValue(value: any): void {
		if (
			value !== null &&
			value !== undefined &&
			this.items.length > 0 &&
			this.valueKey
		) {
			const foundIndex = this.items.findIndex(
				(item) => item[this.valueKey!] === value
			);
			if (foundIndex !== -1) {
				this.selectedItem = this.items[foundIndex];
				this.selectedIndex = foundIndex;
			} else {
				this.selectedItem = null;
				this.selectedIndex = -1;
			}
		} else {
			this.selectedItem = null;
			this.selectedIndex = -1;
		}
	}

	onKeydown(event: KeyboardEvent) {
		if (this.disabled) return;

		switch (event.key) {
		case 'Enter':
			if (this.isDropdownOpen) {
			this.onEnterSearch();
			} else {
			this.toggleDropdown();
			}
			event.preventDefault();
			break;
		case ' ':
			this.toggleDropdown();
			event.preventDefault();
			break;
		case 'Escape':
			this.isDropdownOpen = false;
			break;
		case 'ArrowDown':
			if (!this.isDropdownOpen) this.toggleDropdown();
			this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredItems.length - 1);
			break;
		case 'ArrowUp':
			this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
			break;
		}
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
	reset() {
		this.selectedItem = null;
		this.selectedIndex = -1;
		this.onChange(null); // Notificar al formulario
	}

	@HostListener('document:click', ['$event'])
	handleClickOutside(event: Event) {
		const target = event.target as HTMLElement;
		if (!target.closest('.dropdown-container')) {
			this.isDropdownOpen = false;
		}
	}
}
