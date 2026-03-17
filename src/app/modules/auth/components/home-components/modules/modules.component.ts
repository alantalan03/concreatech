import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {

  currentIndex = 0;

  intervalId!: ReturnType<typeof setInterval>;
  hoverPrev = false;
hoverNext = false;

  modules: ModuleItem[] = [

    {
      number: '01',
      category: 'MODULES.MODULE_1.CATEGORY',
      title: 'MODULES.MODULE_1.TITLE',
      description: 'MODULES.MODULE_1.DESCRIPTION',
      image: 'assets/modules/generar_pedido.jpeg',
      features: [
        'MODULES.MODULE_1.FEATURE_1',
        'MODULES.MODULE_1.FEATURE_2',
        'MODULES.MODULE_1.FEATURE_3',
        'MODULES.MODULE_1.FEATURE_4',
        'MODULES.MODULE_1.FEATURE_5',
        'MODULES.MODULE_1.FEATURE_6'
      ]
    },

    {
      number: '02',
      category: 'MODULES.MODULE_2.CATEGORY',
      title: 'MODULES.MODULE_2.TITLE',
      description: 'MODULES.MODULE_2.DESCRIPTION',
      image: 'assets/modules/generar_remision.jpeg',
      features: [
        'MODULES.MODULE_2.FEATURE_1',
        'MODULES.MODULE_2.FEATURE_2',
        'MODULES.MODULE_2.FEATURE_3',
        'MODULES.MODULE_2.FEATURE_4',
        'MODULES.MODULE_2.FEATURE_5'
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