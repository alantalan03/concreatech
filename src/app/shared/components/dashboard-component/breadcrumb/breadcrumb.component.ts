import {
	Component,
	inject,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	imports: [CommonModule, IconComponent, TranslatePipe],
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnChanges {
	@Input() breadcrumbPages: {
		label: string;
		url: string;
		description?: string;
	}[] = [];

	displayedPages: { label: string; url: string }[] = [];
	hiddenPages: { label: string; url: string }[] = []; // Guardar las páginas ocultas para el tooltip
	activeTooltip: string | null = null; // Para rastrear el tooltip visible
	tooltipVisible: boolean = false;
	tooltipHiddenVisible: boolean = false;
	public ts = inject(TranslateService);
	constructor(private router: Router) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['breadcrumbPages']) {
			this.updateDisplayedPages();
		}
	}

	private updateDisplayedPages(): void {
		if (this.breadcrumbPages.length <= 4) {
			this.displayedPages = [...this.breadcrumbPages];
			this.hiddenPages = [];
		} else {
			this.displayedPages = [
				this.breadcrumbPages[0],
				{ label: '...', url: '' }, // Puntos suspensivos
				this.breadcrumbPages[this.breadcrumbPages.length - 1],
			];
			this.hiddenPages = this.breadcrumbPages.slice(
				1,
				this.breadcrumbPages.length - 2
			); // Las páginas ocultas
		}
	}

	navigateTo(url: string): void {
		if (url !== undefined) {
			this.router.navigate([url]);
		}
	}

	// Mostrar el tooltip
	showTooltip(page: {
		label: string;
		url: string;
		description?: string;
	}): void {
		this.activeTooltip = page.label;
		this.tooltipVisible = true;
	}

	// Ocultar el tooltip
	hideTooltip(): void {
		this.tooltipVisible = false;
	}

	showHiddenPages(): void {
		this.tooltipHiddenVisible = true;
	}

	hideHiddenPages(): void {
		this.tooltipHiddenVisible = false;
	}
}
