import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from 'src/app/shared/components/dashboard-component/icon/icon.component';

interface CasStep {
	number: string;
	title: string;
	description: string;
	items: string[];
}

@Component({
	selector: 'app-cas-automation',
	standalone: true,
	imports: [CommonModule, IconComponent, TranslateModule],
	templateUrl: './cas-automation.component.html',
	styleUrls: ['./cas-automation.component.scss'],
})
export class CasAutomationComponent {
	steps: CasStep[] = [
		{
			number: 'CAS.STEP_1.NUMBER',
			title: 'CAS.STEP_1.TITLE',
			description: 'CAS.STEP_1.DESCRIPTION',
			items: [
				'CAS.STEP_1.ITEM_1',
				'CAS.STEP_1.ITEM_2',
				'CAS.STEP_1.ITEM_3',
				'CAS.STEP_1.ITEM_4',
			],
		},
		{
			number: 'CAS.STEP_2.NUMBER',
			title: 'CAS.STEP_2.TITLE',
			description: 'CAS.STEP_2.DESCRIPTION',
			items: [
				'CAS.STEP_2.ITEM_1',
				'CAS.STEP_2.ITEM_2',
				'CAS.STEP_2.ITEM_3',
				'CAS.STEP_2.ITEM_4',
			],
		},
		{
			number: 'CAS.STEP_3.NUMBER',
			title: 'CAS.STEP_3.TITLE',
			description: 'CAS.STEP_3.DESCRIPTION',
			items: [
				'CAS.STEP_3.ITEM_1',
				'CAS.STEP_3.ITEM_2',
				'CAS.STEP_3.ITEM_3',
				'CAS.STEP_3.ITEM_4',
			],
		},
		{
			number: 'CAS.STEP_4.NUMBER',
			title: 'CAS.STEP_4.TITLE',
			description: 'CAS.STEP_4.DESCRIPTION',
			items: [
				'CAS.STEP_4.ITEM_1',
				'CAS.STEP_4.ITEM_2',
				'CAS.STEP_4.ITEM_3',
				'CAS.STEP_4.ITEM_4',
			],
		},
		{
			number: 'CAS.STEP_5.NUMBER',
			title: 'CAS.STEP_5.TITLE',
			description: 'CAS.STEP_5.DESCRIPTION',
			items: [
				'CAS.STEP_5.ITEM_1',
				'CAS.STEP_5.ITEM_2',
				'CAS.STEP_5.ITEM_3',
				'CAS.STEP_5.ITEM_4',
			],
		},
	];
}
