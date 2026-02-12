/**
 *!	 	Componente DateWarehouseTableComponent
 *!		  Este componente se utiliza como un renderizador de celdas en una tabla
 *!		  de Angular. Su propósito es mostrar una fecha en un formato específico.
 *!		  Se integra con la biblioteca ag-Grid para renderizar la fecha en una celda
 *!		  de la tabla de manera personalizable.
 *!
 *!		 Propiedades:
 *!		 	- dateWarehouseTable: Almacena la fecha transformada que se mostrará
 *!		 		en la celda.
 *!
 *!		 Métodos:
 *!		 	- ngOnInit(): Método de ciclo de vida que se ejecuta al inicializar
 *!		 		el componente. Aquí no se implementa ninguna lógica.
 *!		 	- agInit(params: ICellRendererParams): Método que se llama para
 *!		 		inicializar el renderizador de celdas con los parámetros necesarios.
 *!		 	- refresh(params: ICellRendererParams): Método que determina si
 *!		 		el renderizador debe actualizarse. Siempre devuelve false en este caso.
 *!
 *!		 Uso:
 *!	 	<app-date-warehouse-table></app-date-warehouse-table>
 *!
 *!		 Desarrollado por:
 *!	 	Alan Cortez
 *!
 *!		 Fecha:
 *!	 	30/10/2024
 */
import { DatePipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import localeEs from '@angular/common/locales/es';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
registerLocaleData(localeEs);
@Component({
	selector: 'app-date-table',
	imports: [],
	providers: [
		DatePipe,
		{ provide: LOCALE_ID, useValue: localStorage.getItem('lang') },
	],
	templateUrl: './date-table.component.html',
	styleUrl: './date-table.component.scss',
})
export class DateTableComponent implements ICellRendererAngularComp, OnInit {
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
