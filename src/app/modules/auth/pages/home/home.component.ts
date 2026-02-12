import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/home-components/hero/hero.component';
import { StatsComponent } from '../../components/home-components/stats/stats.component';
import { ProductsComponent } from '../../components/home-components/products/products.component';
import { CharacteristicsComponent } from '../../components/home-components/characteristics/characteristics.component';
import { CasAutomationComponent } from '../../components/home-components/cas-automation/cas-automation.component';
import { ModulesComponent } from '../../components/home-components/modules/modules.component';
import { PricingComponent } from '../../components/home-components/pricing/pricing.component';
import { CtaSectionComponent } from '../../components/home-components/cta-section/cta-section.component';
import { FeaturesComponent } from '../../components/home-components/features/features.component';
import { TestimonialsComponent } from '../../components/home-components/testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports:[
    HeroComponent,
    StatsComponent,
    ProductsComponent,
    FeaturesComponent,
    TestimonialsComponent,
    CasAutomationComponent,
    ModulesComponent,
    PricingComponent,
    CtaSectionComponent,
    
  ]
})
export default class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
