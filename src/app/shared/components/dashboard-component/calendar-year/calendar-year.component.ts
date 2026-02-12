import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { ButtonComponent } from '../button/button.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-year',
  templateUrl: './calendar-year.component.html',
  styleUrls: ['./calendar-year.component.scss'],
  imports: [
      CommonModule,
      FormsModule,
      CalendarModule,
      DatePickerModule
  ]
})
export class CalendarYearComponent implements OnInit, AfterViewInit {
  selectedYear: Date = new Date();
  displayCalendar: boolean = true;
  @ViewChild('calendar', { static: true }) calendar: Calendar;
  @Input() title: string;
  @Input() showTitle: boolean = false;
  @Output() yearSelected: EventEmitter<Date> = new EventEmitter<Date>();

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    setTimeout(() => this.calendar?.inputfieldViewChild?.nativeElement?.focus());
  }
  onSelect(event:Date): void {
    this.displayCalendar = false;
    this.yearSelected.emit(event);
  }
  acceptSelection(): void {
    // Aquí puedes implementar la lógica para aceptar la selección, por ejemplo, cerrar el calendario
    this.calendar.overlayVisible = false;
  }
  cancelSelection(): void {
    this.selectedYear = new Date();
    this.calendar.overlayVisible = false;
  }
  clearSelection(): void {
    this.selectedYear = new Date();
  }
}
