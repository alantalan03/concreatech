import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface ModuleItem {
  number: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId: any;

  modules: ModuleItem[] = [
    {
      number: '01',
      category: 'modules.dashboard.category',
      title: 'modules.dashboard.title',
      description: 'modules.dashboard.description',
      features: [
        'modules.dashboard.f1',
        'modules.dashboard.f2',
        'modules.dashboard.f3',
        'modules.dashboard.f4'
      ],
      image: 'assets/dashboard.png'
    },
    {
      number: '02',
      category: 'modules.orders.category',
      title: 'modules.orders.title',
      description: 'modules.orders.description',
      features: [
        'modules.orders.f1',
        'modules.orders.f2',
        'modules.orders.f3',
        'modules.orders.f4'
      ],
      image: 'assets/remisiones.png'
    },
    {
      number: '03',
      category: 'modules.analytics.category',
      title: 'modules.analytics.title',
      description: 'modules.analytics.description',
      features: [
        'modules.analytics.f1',
        'modules.analytics.f2',
        'modules.analytics.f3',
        'modules.analytics.f4'
      ],
      image: 'assets/reportes.png'
    }
  ];

  ngOnInit(): void {
    this.autoPlay();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.modules.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.modules.length) % this.modules.length;
  }

  goTo(i: number): void {
    this.currentIndex = i;
  }

  autoPlay(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 7000);
  }
}