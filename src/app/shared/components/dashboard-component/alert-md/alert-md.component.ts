import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CloseButtonComponent } from '../close-button/close-button.component';
import { CircleInformationComponent } from '../circle-information/circle-information.component';
import { LinkComponent } from '../link/link.component';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { TranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
	selector: 'app-alert-md',
	imports: [
		CommonModule,
		CloseButtonComponent,
		CircleInformationComponent,
		LinkComponent,
		TranslatePipe,
	],
	standalone: true,
	templateUrl: './alert-md.component.html',
	styleUrls: ['./alert-md.component.scss'],
})
export class AlertMdComponent {
	public ts = inject(TranslateService);
	/** Tipo de alerta: success, info, danger, warning */
	@Input() type: 'success' | 'info' | 'danger' | 'warning' = 'success';

	/** Posicionamiento de la alerta */
	@Input() position:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'center-left'
		| 'center'
		| 'center-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right' = 'top-right';

	/** Control de visibilidad de acciones */
	@Input() Primaryaction: boolean = false;
	@Input() Secondaryaction: boolean = false;

	/** Textos para el mensaje */
	@Input() messageTitle: string = 'Default Title';
	@Input() messageSubtitle: string =
		'The description of this message can’t be more than 2 lines. After that, the text will be truncated.';

	/** Configuración de acciones primarias y secundarias */
	@Input() primaryActionText: string = 'Primary Action';
	@Input() primaryActionUrl: string = '#';
	@Input() secondaryActionText: string = 'Secondary Action';
	@Input() secondaryActionUrl: string = '#';

	/** Eventos para comunicar al componente padre */
	@Output() primaryActionClick : EventEmitter<any> = new EventEmitter<any>();
	@Output() secondaryActionClick :EventEmitter<any> = new EventEmitter<any>();
	@Output() closeButtonClick = new EventEmitter<void>();

	/** Control de visibilidad */
	public isVisible: boolean = true;

	/** Método para manejar la acción primaria */
	handlePrimaryAction(): void {
		this.primaryActionClick.emit({
			primaryAction:true, 
			url: this.primaryActionUrl
		});
	}

	/** Método para manejar la acción secundaria */
	handleSecondaryAction(): void {
		this.secondaryActionClick.emit();
	}

	/** Método para cerrar la alerta */
	closeAlert(): void {
		this.closeButtonClick.emit();
	}
}
