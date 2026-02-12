/**
 *!	 	Componente CardsWarehouseComponent
 *!		  Este componente muestra una serie de tarjetas (cards) en un formato visual
 *!		  atractivo. Permite a los usuarios interactuar con las tarjetas y proporciona
 *!		  información adicional mediante tooltips.
 *!
 *!		 Propiedades:
 *!		 	- cards: (Array) Array de tarjetas que se mostrarán en el componente.
 *!		 	- quantity: (number) Cantidad total de tarjetas mostradas, calculada al
 *!		 		inicializar el componente.
 *!		 	- isTooltipVisible: (boolean) Indica si el tooltip debe ser visible.
 *!		 		Valor por defecto: false.
 *!		 	- tooltipText: (string) Texto que se mostrará en el tooltip.
 *!		 	- activeTooltipIndex: (number | null) Índice de la tarjeta actualmente
 *!		 		activa para mostrar el tooltip.
 *!
 *!		 Métodos:
 *!		 	- ShowTooltip(event: MouseEvent, text: string): Método que se llama
 *!		 		cuando se activa un tooltip. Muestra el tooltip con el texto especificado
 *!		 		y determina el índice de la tarjeta activa.
 *!		 	- hideTooltip(): Método que oculta el tooltip y restablece el texto.
 *!		 	- findCardIndex(event: MouseEvent): Método privado que encuentra el índice
 *!		 		de la tarjeta basada en el evento de mouse. Devuelve -1 si no se encuentra.
 *!
 *!		 Uso:
 *!	 	<app-cards-warehouse [cards]="arrayDeTarjetas"></app-cards-warehouse>
 *!
 *!		 Desarrollado por:
 *!	 	Alan Cortez
 *!
 *!		 Fecha:
 *!	 	30/10/2024
 */
import { Component, Input, inject } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
@Component({
	selector: 'app-cards-warehouse',
	standalone: true,
	imports: [TranslatePipe],
	templateUrl: './cards-warehouse.component.html',
	styleUrl: './cards-warehouse.component.scss',
})
export class CardsWarehouseComponent {
	@Input() cards = [];
	quantity: number;
	isTooltipVisible = false;
	tooltipText = '';
	activeTooltipIndex: number | null = null;
	public ts = inject(TranslateService);
	ngOnInit(): void {
		this.quantity = this.cards.length;
	}
	ShowTooltip(event: MouseEvent, text: string) {
		this.isTooltipVisible = true;
		this.tooltipText = text;
		this.activeTooltipIndex = this.findCardIndex(event);
	}
	hideTooltip() {
		this.isTooltipVisible = false;
		this.tooltipText = '';
	}
	private findCardIndex(event: MouseEvent): number {
		const target = event.target as HTMLElement;
		const card = target.closest('.card');
		if (card && card.parentElement) {
			return Array.from(card.parentElement.children).indexOf(card);
		}
		return -1; // Indica que no se encontró el elemento deseado
	}
}
