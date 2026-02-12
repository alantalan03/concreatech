import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/shared/components/dashboard-component/icon/icon.component';

interface Testimonial {
  text: string;
  name: string;
  position: string;
  company: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId: any;

  testimonials: Testimonial[] = [
    {
      text: `ConcreaTech transformó completamente nuestra operación. La automatización de silos y el control en tiempo real nos permitió reducir desperdicios en un 35% y mejorar la precisión en nuestras mezclas.`,
      name: 'Ing. Roberto Martínez',
      position: 'Director de Operaciones',
      company: 'CONCRETOS DEL NORTE'
    },
    {
      text: `La plataforma COS nos dio visibilidad total de nuestra operación. Ahora podemos tomar decisiones basadas en datos reales y hemos incrementado nuestra rentabilidad en un 28% en solo 6 meses.`,
      name: 'Lic. María González',
      position: 'Gerente General',
      company: 'PREMEZCLADOS MTY'
    },
    {
      text: `El sistema de remisiones automáticas y el control de flotilla GPS revolucionaron nuestra logística.`,
      name: 'Ing. Carlos Hernández',
      position: 'Gerente de Logística',
      company: 'GRUPO CONSTRUCTOR'
    }
  ];

  logos: string[] = [
    'CEMEX',
    'HOLCIM',
    'APASCO',
    'GCC',
    'CEMENTOS MOCTEZUMA',
    'GRUPO CONSTRUCTOR'
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  next(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.testimonials.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 6000);
  }
}