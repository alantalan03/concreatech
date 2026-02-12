import { DatePipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import localeEs from '@angular/common/locales/es';
import { TranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-date-table-with-action',
  templateUrl: './date-table-with-action.component.html',
  	providers: [
		DatePipe,
		{ provide: LOCALE_ID, useValue: localStorage.getItem('lang') },
	],
  styleUrls: ['./date-table-with-action.component.scss']
})
export class DateTableWithActionComponent implements ICellRendererAngularComp, OnInit {
dateWarehouseTable;
  public datePipe = inject(DatePipe);
  public ts = inject(TranslateService);
  public localeId = inject(LOCALE_ID);
  ngOnInit() {}
  agInit(params: ICellRendererParams): void {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (params.value) {
      const date = new Date(params.value);


      // Convertir la fecha a la zona horaria del usuario
      const formattedDate = date.toLocaleString('es-ES', {
        timeZone: timezone,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      this.dateWarehouseTable = formattedDate;
    } else {
      this.dateWarehouseTable = '---';
    }
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
