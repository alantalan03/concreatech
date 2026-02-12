import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
	selector: '[appTooltip]',
	standalone: true,
})
export class TooltipDirective {
	tooltipElement: HTMLElement;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	@HostListener('click', ['$event']) onClick(event: MouseEvent) {
		event.stopPropagation(); // Prevent closing immediately on click
		if (!this.tooltipElement) {
			this.createTooltip();
			this.addOutsideClickListener();
		} else {
			this.removeTooltip();
		}
	}

	private createTooltip() {
		this.tooltipElement = this.renderer.createElement('span');
		this.tooltipElement.innerHTML =
			'Aquí puedes encontrar el número de orden en el correo de entrega.';
		this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
		this.renderer.addClass(this.tooltipElement, 'tooltip');

		// Positioning (simple example)
		const rect = this.el.nativeElement.getBoundingClientRect();
		this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
		this.renderer.setStyle(
			this.tooltipElement,
			'top',
			`${rect.bottom + window.scrollY - 70}px`
		);
		this.renderer.setStyle(
			this.tooltipElement,
			'left',
			`${rect.left + window.scrollX - 330}px`
		);
	}

	private removeTooltip() {
		if (this.tooltipElement) {
			this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
			this.tooltipElement = null;
		}
	}

	private addOutsideClickListener() {
		const outsideClickListener = () => {
			this.removeTooltip();
			document.removeEventListener('click', outsideClickListener);
		};
		setTimeout(() => document.addEventListener('click', outsideClickListener)); // Delay to avoid immediate close
	}
}
