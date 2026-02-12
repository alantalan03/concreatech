/**
 *!	 	Componente CalendarComponent
 *!		  Este componente proporciona un calendario interactivo que permite a los
 *!		  usuarios seleccionar fechas. Los usuarios pueden seleccionar múltiples
 *!		  fechas, y el componente emitirá un evento cuando las fechas sean seleccionadas.
 *!
 *!		 Propiedades:
 *!		 	- selectedDates: (Date[]) Array que almacena las fechas seleccionadas por el usuario.
 *!		 	- displayCalendar: (boolean) Indica si el calendario debe ser visible.
 *!		 		Valor por defecto: true.
 *!
 *!		 Métodos:
 *!		 	- onSelect(event): Método que se llama al seleccionar fechas en el calendario.
 *!		 		Cierra el calendario y emite el evento con las fechas seleccionadas.
 *!		 	- acceptSelection(): Método que puede implementar la lógica para aceptar la
 *!		 		selección y cerrar el calendario.
 *!		 	- cancelSelection(): Método que restablece la selección de fechas y cierra el calendario.
 *!		 	- clearSelection(): Método que limpia las fechas seleccionadas.
 *!
 *!		 Uso:
 *!	 	<app-calendar (datesSelected)="onDatesSelected($event)"></app-calendar>
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
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonComponent } from '../button/button.component';
@Component({
	selector: 'app-calendar',
	imports: [
		CommonModule,
		FormsModule,
		CalendarModule,
		DatePickerModule,
		ButtonComponent,
	],
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
	selectedDates: Date[] = [];
	displayCalendar: boolean = true;
	@ViewChild('calendar', { static: true }) calendar: Calendar;
	@Input() title: string;
	@Input() isRange: boolean = true;
	@Input() showTitle: boolean = false;
	@Output() datesSelected: EventEmitter<Date[]> = new EventEmitter<Date[]>();

	ngOnInit(): void {
		const currentDate = new Date(); // Obtén la fecha actual
		currentDate.setHours(23);
		currentDate.setMinutes(59);
		currentDate.setSeconds(59);
		const lastMonthDate = new Date();
		const twoMonthsAgoDate = new Date();
		const threeMonthsAgoDate = new Date();
		lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
		twoMonthsAgoDate.setMonth(twoMonthsAgoDate.getMonth() - 2);
		threeMonthsAgoDate.setMonth(threeMonthsAgoDate.getMonth() - 3);
		this.selectedDates = [lastMonthDate, currentDate];
		this.datesSelected.emit(this.selectedDates);
	}
	onSelect(event): void {
		this.displayCalendar = false;
		this.datesSelected.emit(this.selectedDates);
	}
	acceptSelection(): void {
		// Aquí puedes implementar la lógica para aceptar la selección, por ejemplo, cerrar el calendario
		this.calendar.overlayVisible = false;
	}
	cancelSelection(): void {
		this.selectedDates = [];
		this.calendar.overlayVisible = false;
	}
	clearSelection(): void {
		this.selectedDates = [];
	}
}
