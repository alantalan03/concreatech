import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from 'src/app/shared/components/dashboard-component/icon/icon.component';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
    imports: [CommonModule, TranslateModule,IconComponent],
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
onstructor() { }

  ngOnInit() {
  }

  features = [
  {
    title: 'Automatización Completa',
    description:
      'Elimina procesos manuales y errores humanos. Desde la recepción del pedido hasta la entrega, todo automatizado y conectado.',
    icon: `clock`,
  },
  {
    title: 'Plataforma en la Nube',
    description:
      'Sistema 100% cloud-based con acceso desde cualquier dispositivo. Datos seguros y actualizaciones sin interrupciones.',
    icon: `wifi`,
  },
  {
    title: 'Business Intelligence',
    description:
      'Dashboards ejecutivos en tiempo real con análisis profundo de rentabilidad, eficiencia y KPIs.',
    icon: `layout-top`,
  },
  {
    title: 'IoT en Tiempo Real',
    description:
      'Monitoreo instantáneo de todas las operaciones con sensores que envían datos críticos cada segundo.',
    icon: `star-01`,
  },
  {
    title: 'Escalabilidad Modular',
    description:
      'Empieza con lo básico y añade funcionalidades conforme crece tu negocio.',
    icon: `transform`,
  },
  {
    title: 'Multi-Planta',
    description:
      'Gestión centralizada de múltiples plantas con visibilidad consolidada y reportes corporativos.',
    icon: `compass-01`,
  },
  {
    title: 'Seguridad Enterprise',
    description:
      'Almacenamiento certificado, respaldos automáticos y recuperación garantizada.',
    icon: `shield-01`,
  },
  {
    title: 'Machine Learning <span class="soon">[Próximamente]</span>',
    description:
      'Proyecciones inteligentes, optimización de rutas y predicción de mantenimiento.',
    icon: `certificate-01`,
  },
];
}
