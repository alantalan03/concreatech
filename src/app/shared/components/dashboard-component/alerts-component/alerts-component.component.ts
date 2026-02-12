/**
 *! 	Componente AlertsComponentComponent
 *!	  Este componente se encarga de mostrar alertas informativas en la interfaz de usuario.
 *!	  Permite personalizar el tipo de alerta (éxito, error, información, etc.) y las acciones relacionadas.
 *!
 *!	 Propiedades:
 *!	 	- showAlert: (boolean) Indica si la alerta debe mostrarse o no.
 *!	 	- alertType: (string) Tipo de alerta a mostrar (éxito, error, información, etc.).
 *!	 	- position: (string) Posición de la alerta en la pantalla.
 *!	 	- textAlert: (string) Texto principal de la alerta.
 *!	 	- subtitleAlert: (string) Subtítulo de la alerta.
 *!	 	- imgType: (string) URL de la imagen asociada a la alerta.
 *!	 	- primaryActionTxt: (string) Texto del botón de acción primaria.
 *!	 	- primaryActionUrl: (string) URL de la acción primaria a realizar.
 *!	 	- secondaryActionTxt: (string) Texto del botón de acción secundaria.
 *!	 	- secondaryActionUrl: (string) URL de la acción secundaria a realizar.
 *!	 	- urlSuccess: (string) URL de la imagen para alertas de éxito.
 *!	 	- urlError: (string) URL de la imagen para alertas de error.
 *!	 	- urlInfo: (string) URL de la imagen para alertas de información.
 *!	 	- urlZap: (string) URL de la imagen para alertas de tipo zap.
 *!
 *!	 Métodos:
 *!	 	- closeAlert(): Método que oculta la alerta al cambiar el estado de `showAlert`.
 *!	 	- ngOnInit(): Método del ciclo de vida que se ejecuta al inicializar el componente.
 *!
 *!	 Uso:
 *! 	<app-alerts-component
 *! 		[showAlert]="true"
 *! 		alertType="'success'"
 *! 		position="'top-right'"
 *! 		textAlert="'Operación exitosa'"
 *! 		subtitleAlert="'El proceso se completó correctamente.'"
 *! 		imgType="urlSuccess"
 *! 		primaryActionTxt="'Ir a la página'"
 *! 		primaryActionUrl="/home"
 *! 		secondaryActionTxt="'Cancelar'"
 *! 		secondaryActionUrl="/cancel">
 *! 	</app-alerts-component>
 *!
 *!	 Desarrollado por:
 *! 	Alan Cortez
 *!
 *!	 Fecha:
 *! 	30/10/2024
 */
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { CloseButtonComponent } from '../close-button/close-button.component';

@Component({
	selector: 'app-alerts',
	standalone: true,
	imports: [
		// CommonModule,
		// RouterOutlet,
		RouterLink,
		// RouterLinkActive,
		TranslatePipe,
		CloseButtonComponent,
	],
	providers: [CommonModule],
	templateUrl: './alerts-component.component.html',
	styleUrl: './alerts-component.component.scss',
})
export class AlertsComponentComponent implements OnInit {
	@Input() showAlert: boolean;
	@Input() alertType: string = '';
	@Input() position: string = '';
	@Input() textAlert: string = '';
	@Input() subtitleAlert: string = '';
	@Input() imgType: string = '';
	@Input() primaryActionTxt: string = '';
	@Input() primaryActionUrl: string = '';
	@Input() secondaryActionTxt: string = '';
	@Input() secondaryActionUrl: string = '';
	@Input() activateInterval: boolean = false;
	public router = inject(Router);
	public ts = inject(TranslateService);
	counterValue: number = 100;
	private intervalId: any;
	// public errorService = inject(ErrorService)

	urlSuccess = '../../../../../assets/images/toast-ok-warehouse.svg';
	urlError = '../../../../../assets/images/toast-error-warehouse.svg';
	urlInfo = '../../../../../assets/images/toast-info-warehouse.svg';
	urlZap = '../../../../../assets/images/toast-zap-warehouse.svg';

	closeAlert() {
		this.showAlert = !this.showAlert;
	}

	ngOnInit(): void {}
	ngOnDestroy(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.counterValue = 100;
		if (this.activateInterval) {
			if (this.intervalId) {
				clearInterval(this.intervalId);
			}
			this.intervalId = setInterval(() => {
				if (this.counterValue > 0 && this.activateInterval) {
					this.counterValue -= 1; // Disminuye el contador
				} else {
					this.activateInterval = false;
					this.showAlert = false;

					// Limpiar el intervalo cuando no se necesita más
					clearInterval(this.intervalId);
				}
			}, 300); // Intervalo de actualización en milisegundos
		}
	}
}
