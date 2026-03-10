import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  badgeColor?: string;
}

@Component({
  selector: 'app-pricing',
  imports:[CommonModule, TranslateModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {

plans: PricingPlan[] = [

{
name: 'PRICING.PLANS.BASIC.NAME',
price: '$5,000',
period: 'PRICING.PERIOD',
features: [
'PRICING.PLANS.BASIC.FEATURE_1',
'PRICING.PLANS.BASIC.FEATURE_2',
'PRICING.PLANS.BASIC.FEATURE_3',
'PRICING.PLANS.BASIC.FEATURE_4',
'PRICING.PLANS.BASIC.FEATURE_5',
'PRICING.PLANS.BASIC.FEATURE_6',
'PRICING.PLANS.BASIC.FEATURE_7'
]
},

{
name: 'PRICING.PLANS.MID.NAME',
price: '$7,000',
period: 'PRICING.PERIOD',
features: [
'PRICING.PLANS.MID.FEATURE_1',
'PRICING.PLANS.MID.FEATURE_2',
'PRICING.PLANS.MID.FEATURE_3',
'PRICING.PLANS.MID.FEATURE_4',
'PRICING.PLANS.MID.FEATURE_5',
'PRICING.PLANS.MID.FEATURE_6'
]
},

{
name: 'PRICING.PLANS.ADVANCED.NAME',
price: '$9,000',
period: 'PRICING.PERIOD',
featured: true,
badge: 'PRICING.BADGES.SOON',
features: [
'PRICING.PLANS.ADVANCED.FEATURE_1',
'PRICING.PLANS.ADVANCED.FEATURE_2',
'PRICING.PLANS.ADVANCED.FEATURE_3',
'PRICING.PLANS.ADVANCED.FEATURE_4',
'PRICING.PLANS.ADVANCED.FEATURE_5',
'PRICING.PLANS.ADVANCED.FEATURE_6'
]
},

{
name: 'PRICING.PLANS.PLUS.NAME',
price: '$15,000',
period: 'PRICING.PERIOD',
badge: 'PRICING.BADGES.SOON',
badgeColor: 'secondary',
features: [
'PRICING.PLANS.PLUS.FEATURE_1',
'PRICING.PLANS.PLUS.FEATURE_2',
'PRICING.PLANS.PLUS.FEATURE_3',
'PRICING.PLANS.PLUS.FEATURE_4',
'PRICING.PLANS.PLUS.FEATURE_5',
'PRICING.PLANS.PLUS.FEATURE_6',
'PRICING.PLANS.PLUS.FEATURE_7'
]
}

];


  startPlan(plan: PricingPlan) {

    console.log('Plan seleccionado:', plan.name);

    // Aquí puedes integrar:
    // Stripe
    // Checkout
    // Calendly
    // Formulario

  }

}