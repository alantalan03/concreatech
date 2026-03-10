import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface Testimonial {
  text: string;
  name: string;
  position: string;
  company: string;
}

@Component({
  selector: 'app-testimonials',
  imports:[CommonModule, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId: any;

  testimonials: Testimonial[] = [
    {
      text: 'TESTIMONIALS.ITEM_1.TEXT',
      name: 'TESTIMONIALS.ITEM_1.NAME',
      position: 'TESTIMONIALS.ITEM_1.POSITION',
      company: 'TESTIMONIALS.ITEM_1.COMPANY'
    },
    {
      text: 'TESTIMONIALS.ITEM_2.TEXT',
      name: 'TESTIMONIALS.ITEM_2.NAME',
      position: 'TESTIMONIALS.ITEM_2.POSITION',
      company: 'TESTIMONIALS.ITEM_2.COMPANY'
    },
    {
      text: 'TESTIMONIALS.ITEM_3.TEXT',
      name: 'TESTIMONIALS.ITEM_3.NAME',
      position: 'TESTIMONIALS.ITEM_3.POSITION',
      company: 'TESTIMONIALS.ITEM_3.COMPANY'
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