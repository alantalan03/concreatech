import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Testimonial {
  text: string;
  name: string;
  position: string;
  company: string;
}

@Component({
  selector: 'app-testimonials',
  imports:[CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId: any;

  testimonials: Testimonial[] = [
    {
      text: 'ConcreaTech transformó completamente nuestra operación. La automatización de silos y el control en tiempo real nos permitió reducir desperdicios en un 35% y mejorar la precisión en nuestras mezclas.',
      name: 'Ing. Roberto Martínez',
      position: 'Director de Operaciones',
      company: 'CONCRETOS DEL NORTE'
    },
    {
      text: 'La plataforma COS nos dio visibilidad total de nuestra operación. Ahora podemos tomar decisiones basadas en datos reales y hemos incrementado nuestra rentabilidad en un 28% en solo 6 meses.',
      name: 'Lic. María González',
      position: 'Gerente General',
      company: 'PREMEZCLADOS MTY'
    },
    {
      text: 'El sistema de remisiones automáticas y el control de flotilla GPS revolucionaron nuestra logística. Reducimos tiempos de entrega en 40% y mejoramos significativamente la satisfacción de nuestros clientes.',
      name: 'Ing. Carlos Hernández',
      position: 'Gerente de Logística',
      company: 'GRUPO CONSTRUCTOR'
    }
  ];

  ngOnInit(): void {
    this.startAuto();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAuto() {
    this.intervalId = setInterval(() => {
      this.move(1);
    }, 5000);
  }

  pause() {
    clearInterval(this.intervalId);
  }

  resume() {
    this.startAuto();
  }

  move(direction: number) {
    this.currentIndex =
      (this.currentIndex + direction + this.testimonials.length) %
      this.testimonials.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

}