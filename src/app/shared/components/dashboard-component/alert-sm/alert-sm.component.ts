import { Component, Input } from '@angular/core';
import { CloseButtonComponent } from '../close-button/close-button.component';
import { IconComponent } from '../icon/icon.component';
import { CircleInformationComponent } from '../circle-information/circle-information.component';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '../link-component/link-component.component';

@Component({
	selector: 'app-alert-sm',
	imports: [
		CommonModule,
		CloseButtonComponent,
		IconComponent,
		CircleInformationComponent,
		LinkComponent,
	],
	templateUrl: './alert-sm.component.html',
	styleUrl: './alert-sm.component.scss',
})
export class AlertSmComponent {
	@Input() type: 'success' | 'info' | 'danger' | 'warning' = 'success';
	@Input() action: boolean = false;
	@Input() position:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'center-left'
		| 'center'
		| 'center-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right' = 'top-center';
}
