import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconComponent } from 'src/app/shared/components/dashboard-component/icon/icon.component';

interface CasStep {
  number: string;
  title: string;
  description: string;
  items: string[];
}

@Component({
  selector: 'app-cas-automation',
  imports:[CommonModule, IconComponent],
  templateUrl: './cas-automation.component.html',
  styleUrls: ['./cas-automation.component.scss']
})
export class CasAutomationComponent {

  steps: CasStep[] = [
    {
      number: 'PASO 1',
      title: 'Diagnóstico en Sitio',
      description: 'Visitamos tu planta para análisis exhaustivo de procesos operativos.',
      items: [
        'Análisis de flujo de materiales',
        'Detección de puntos críticos',
        'Evaluación de infraestructura',
        'Reporte con recomendaciones'
      ]
    },
    {
      number: 'PASO 2',
      title: 'Propuesta Técnica',
      description: 'Diseñamos solución personalizada con especificaciones técnicas.',
      items: [
        'Arquitectura de automatización',
        'Selección de hardware certificado',
        'Especificaciones de sensores/PLCs',
        'Cronograma de implementación'
      ]
    },
    {
      number: 'PASO 3',
      title: 'Cotización del Proyecto',
      description: 'Cotización detallada con diferentes opciones de implementación.',
      items: [
        'Desglose completo de inversión',
        'Opciones por fases',
        'ROI y ahorros estimados',
        'Términos comerciales'
      ]
    },
    {
      number: 'PASO 4',
      title: 'Implementación',
      description: 'Instalamos hardware IoT y configuramos sistemas de control.',
      items: [
        'Instalación de sensores',
        'Programación de PLCs',
        'Integración con sistemas',
        'Pruebas y puesta en marcha'
      ]
    },
    {
      number: 'PASO 5',
      title: 'Capacitación y Soporte',
      description: 'Entrenamos a tu equipo con soporte continuo.',
      items: [
        'Capacitación técnica completa',
        'Manuales de operación',
        'Soporte remoto 24/7',
        'Mantenimiento preventivo'
      ]
    }
  ];

}