import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconComponent } from 'src/app/shared/components/dashboard-component/icon/icon.component';

interface ModuleItem {
  number: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  features: string[];
}

@Component({
  selector: 'app-modules',
  imports:[CommonModule,IconComponent],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {

  currentIndex = 0;

  intervalId: any;

  modules: ModuleItem[] = [
    {
      number: '01',
      category: 'Monitoreo',
      title: 'Dashboard Operativo',
      description:
        'Visualiza el estado de tu planta en tiempo real. Monitorea producción, inventarios de materiales, volúmenes diarios y proyecciones mensuales desde un solo panel intuitivo.',
      image: 'assets/modules/dashboard.png',
      features: [
        'KPIs en tiempo real de producción',
        'Control de inventarios por material',
        'Gráficas de volumen acumulado y proyectado',
        'Vista multi-planta consolidada'
      ]
    },

    {
      number: '02',
      category: 'Gestión',
      title: 'Generación de Remisiones',
      description:
        'Crea y gestiona pedidos de forma digital con seguimiento completo. Desde la captura inicial hasta la ubicación de entrega, cada detalle bajo control con integración directa al sistema CAS.',
      image: 'assets/modules/remisiones.png',
      features: [
        'Captura rápida de pedidos y clientes',
        'Configuración técnica de mezclas',
        'Geolocalización de obras en tiempo real',
        'Control de temperatura y humedad del material'
      ]
    },

    {
      number: '03',
      category: 'Analytics',
      title: 'Reportes y Analytics',
      description:
        'Sistema avanzado de reportes con filtros inteligentes. Genera reportes de producción, inventarios, clientes y análisis operativos con exportación a múltiples formatos.',
      image: 'assets/modules/reportes.png',
      features: [
        'Reportes de producción por periodo',
        'Control diario de inventarios de materiales',
        'Análisis por cliente, proyecto y vendedor',
        'Exportación a Excel y PDF'
      ]
    }
  ];



  ngOnInit(): void {
    this.startAutoSlide();
  }



  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }



  move(direction: number): void {

    this.currentIndex =
      (this.currentIndex + direction + this.modules.length) %
      this.modules.length;

  }



  goTo(index: number): void {
    this.currentIndex = index;
  }



  trackByIndex(index: number): number {
    return index;
  }



  /* ==========================
  AUTOPLAY
  ========================== */

  startAutoSlide(): void {

    this.intervalId = setInterval(() => {

      this.move(1);

    }, 6000);

  }



  pauseAutoSlide(): void {
    clearInterval(this.intervalId);
  }



  resumeAutoSlide(): void {
    this.startAutoSlide();
  }

}