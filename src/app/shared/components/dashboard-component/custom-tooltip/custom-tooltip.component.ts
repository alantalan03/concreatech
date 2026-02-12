import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
	selector: 'custom-tooltip',
	template: ` <div class="custom-tooltip">
		{{ params.value }}
	</div>`,
	styleUrls: ['./custom-tooltip.component.scss'],
	standalone: false,
})
export class CustomTooltipComponent implements ITooltipAngularComp {
	params: any;
	agInit(params: any): void {
		this.params = params;
	}
}
