import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-cards-dashboard',
	templateUrl: './cards-dashboard.component.html',
	imports: [NgIf, NgFor, TranslatePipe, IconComponent],
	styleUrls: ['./cards-dashboard.component.scss'],
})
export class CardsDashboardComponent implements OnInit {
	@Input() cards = [];
	@Input() direction: string = 'vertical';
	isTooltipVisible = false;
	tooltipText = '';
	activeTooltipIndex: number | null = null;
	public ts = inject(TranslateService);

	ngOnInit(): void {}

	ShowTooltip(event: MouseEvent, text: string) {
		this.isTooltipVisible = true;
		this.tooltipText = text;
		this.activeTooltipIndex = this.findCardIndex(event);
	}

	hideTooltip() {
		this.isTooltipVisible = false;
		this.tooltipText = '';
		this.activeTooltipIndex = null;
	}

	private findCardIndex(event: MouseEvent): number {
		const target = event.target as HTMLElement;
		const card = target.closest('.card');
		return Array.from(card.parentElement.children).indexOf(card);
	}
}
