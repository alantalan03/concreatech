import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from 'src/app/shared/components/dashboard-component/icon/icon.component';

@Component({
	selector: 'app-features',
  standalone: true,
	templateUrl: './features.component.html',
	imports: [CommonModule, TranslateModule, IconComponent],
	styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	features = [
		{
			title: 'FEATURES.FEATURE_1.TITLE',
			description: 'FEATURES.FEATURE_1.DESCRIPTION',
			icon: 'clock',
		},
		{
			title: 'FEATURES.FEATURE_2.TITLE',
			description: 'FEATURES.FEATURE_2.DESCRIPTION',
			icon: 'wifi',
		},
		{
			title: 'FEATURES.FEATURE_3.TITLE',
			description: 'FEATURES.FEATURE_3.DESCRIPTION',
			icon: 'layout-top',
		},
		{
			title: 'FEATURES.FEATURE_4.TITLE',
			description: 'FEATURES.FEATURE_4.DESCRIPTION',
			icon: 'star-01',
		},
		{
			title: 'FEATURES.FEATURE_5.TITLE',
			description: 'FEATURES.FEATURE_5.DESCRIPTION',
			icon: 'transform',
		},
		{
			title: 'FEATURES.FEATURE_6.TITLE',
			description: 'FEATURES.FEATURE_6.DESCRIPTION',
			icon: 'compass-01',
		},
		{
			title: 'FEATURES.FEATURE_7.TITLE',
			description: 'FEATURES.FEATURE_7.DESCRIPTION',
			icon: 'shield-01',
		},
		{
			title: 'FEATURES.FEATURE_8.TITLE',
			description: 'FEATURES.FEATURE_8.DESCRIPTION',
			icon: 'certificate-01',
		},
	];
}
