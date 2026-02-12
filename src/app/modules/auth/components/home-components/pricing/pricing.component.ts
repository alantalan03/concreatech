import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {

  plans: PricingPlan[] = [
    {
      name: 'pricing.basic.name',
      price: '$5,000',
      period: 'pricing.period',
      features: [
        'pricing.basic.f1',
        'pricing.basic.f2',
        'pricing.basic.f3',
        'pricing.basic.f4',
        'pricing.basic.f5',
        'pricing.basic.f6',
        'pricing.basic.f7'
      ]
    },
    {
      name: 'pricing.intermediate.name',
      price: '$7,000',
      period: 'pricing.period',
      features: [
        'pricing.intermediate.f1',
        'pricing.intermediate.f2',
        'pricing.intermediate.f3',
        'pricing.intermediate.f4',
        'pricing.intermediate.f5',
        'pricing.intermediate.f6'
      ]
    },
    {
      name: 'pricing.advanced.name',
      price: '$9,000',
      period: 'pricing.period',
      badge: 'pricing.coming',
      featured: true,
      features: [
        'pricing.advanced.f1',
        'pricing.advanced.f2',
        'pricing.advanced.f3',
        'pricing.advanced.f4',
        'pricing.advanced.f5',
        'pricing.advanced.f6'
      ]
    },
    {
      name: 'pricing.plus.name',
      price: '$15,000',
      period: 'pricing.period',
      badge: 'pricing.coming',
      features: [
        'pricing.plus.f1',
        'pricing.plus.f2',
        'pricing.plus.f3',
        'pricing.plus.f4',
        'pricing.plus.f5',
        'pricing.plus.f6',
        'pricing.plus.f7'
      ]
    }
  ];
}