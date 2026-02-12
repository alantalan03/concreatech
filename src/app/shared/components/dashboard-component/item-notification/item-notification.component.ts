import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-item-notification',
	templateUrl: './item-notification.component.html',
	styleUrls: ['./item-notification.component.scss'],
	imports: [CommonModule, TranslatePipe, IconComponent],
})
export class ItemNotificationComponent implements OnInit {
	public ts = inject(TranslateService);
	@Input() order;
	@Input() user;
	@Input() all;
	timeElapsed:number;
	isMinutes	=true;
	isHour		=false;
	isDays		=false;
	isMonths	=false;
	isYear		=false;
	constructor() {}
	ngOnInit(): void {}
	ngOnChanges(changes: SimpleChanges): void {
		//Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
		//Add '${implements OnChanges}' to the class.
		if (this.order.time_elapsed < 60) {
			this.timeElapsed = this.order.time_elapsed;
			this.isMinutes = true;
			this.isHour    = false;
			this.isDays    = false;
			this.isMonths  = false;
			this.isYear    = false;
		}
		else if (this.order.time_elapsed < 1440) {
			this.timeElapsed = Math.round(this.order.time_elapsed / 60);
			this.isMinutes = false;
			this.isHour    = true;
			this.isDays    = false;
			this.isMonths  = false;
			this.isYear    = false;
		}
		else if (this.order.time_elapsed < 43200) { // Menos de 30 días
			this.timeElapsed = Math.round(this.order.time_elapsed / 1440);
			this.isMinutes = false;
			this.isHour    = false;
			this.isDays    = true;
			this.isMonths  = false;
			this.isYear    = false;
		}
		else if (this.order.time_elapsed < 525600) { // Menos de 1 año
			this.timeElapsed = Math.round(this.order.time_elapsed / 43200); // 30 días
			this.isMinutes = false;
			this.isHour    = false;
			this.isDays    = false;
			this.isMonths  = true;
			this.isYear    = false;
		}
		else {
			this.timeElapsed = Math.round(this.order.time_elapsed / 525600); // 365 días
			this.isMinutes = false;
			this.isHour    = false;
			this.isDays    = false;
			this.isMonths  = false;
			this.isYear    = true;
		}
		
	}
}
