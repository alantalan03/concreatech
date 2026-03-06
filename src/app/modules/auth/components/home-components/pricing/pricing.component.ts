import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  imports:[CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {

  plans: PricingPlan[] = [

    {
      name: 'Básica',
      price: '$5,000',
      period: 'MXN por planta / mes',
      features: [
        'Gestión de pedidos',
        'Diseño de mezclas',
        'Control de inventarios',
        'Remisiones automáticas',
        'Automatización de carga (CAS)',
        'Usuarios ilimitados',
        'Soporte comercial'
      ]
    },

    {
      name: 'Intermedia',
      price: '$7,000',
      period: 'MXN por planta / mes',
      features: [
        'Todo lo de Básica +',
        'Control de calidad completo',
        'Mantenimiento de equipos',
        'Nómina semanal',
        'Reportes de productividad',
        'Soporte prioritario'
      ]
    },

    {
      name: 'Avanzada',
      price: '$9,000',
      period: 'MXN por planta / mes',
      featured: true,
      badge: 'COMING SOON',
      features: [
        'Todo lo de Intermedia +',
        'Ventas y CxC',
        'Compras y CxP',
        'Estados financieros',
        'Análisis de rentabilidad',
        'Dashboards ejecutivos'
      ]
    },

    {
      name: 'Plus',
      price: '$15,000',
      period: 'MXN por planta / mes',
      badge: 'COMING SOON',
      badgeColor: 'secondary',
      features: [
        'Todo lo de Avanzada +',
        'Control de flotilla GPS',
        'Gestión multi-planta',
        'Optimización de rutas',
        'Analytics avanzado (BI)',
        'Soporte 24/7 premium',
        'Gerente de cuenta dedicado'
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