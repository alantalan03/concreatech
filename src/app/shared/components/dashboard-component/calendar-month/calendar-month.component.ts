import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    DatePickerModule,
    // ButtonComponent,
  ]
})
export class CalendarMonthComponent implements OnInit {
  selectedMonth: Date = new Date();
  displayCalendar: boolean = true;
  @ViewChild('calendar', { static: true }) calendar: Calendar;
  @Input() title: string;
  @Input() showTitle: boolean = false;
  @Output() monthSelected: EventEmitter<Date> = new EventEmitter<Date>();

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    // setTimeout(() => this.calendar?.inputfieldViewChild?.nativeElement?.focus());
  }
  onSelect(event:Date): void {
    this.displayCalendar = false;
    this.monthSelected.emit(event);
  }
  acceptSelection(): void {
    // Aquí puedes implementar la lógica para aceptar la selección, por ejemplo, cerrar el calendario
    this.calendar.overlayVisible = false;
  }
  cancelSelection(): void {
    this.selectedMonth = new Date();
    this.calendar.overlayVisible = false;
  }
  clearSelection(): void {
    this.selectedMonth = new Date();
  }
}
