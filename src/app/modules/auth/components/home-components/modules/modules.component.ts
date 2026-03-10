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
  imports:[CommonModule,IconComponent,TranslateModule],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {

  currentIndex = 0;

  intervalId: any;

modules: ModuleItem[] = [

{
number: '01',
category: 'MODULES.MODULE_1.CATEGORY',
title: 'MODULES.MODULE_1.TITLE',
description: 'MODULES.MODULE_1.DESCRIPTION',
image: 'assets/modules/dashboard.png',
features: [
'MODULES.MODULE_1.FEATURE_1',
'MODULES.MODULE_1.FEATURE_2',
'MODULES.MODULE_1.FEATURE_3',
'MODULES.MODULE_1.FEATURE_4'
]
},

{
number: '02',
category: 'MODULES.MODULE_2.CATEGORY',
title: 'MODULES.MODULE_2.TITLE',
description: 'MODULES.MODULE_2.DESCRIPTION',
image: 'assets/modules/remisiones.png',
features: [
'MODULES.MODULE_2.FEATURE_1',
'MODULES.MODULE_2.FEATURE_2',
'MODULES.MODULE_2.FEATURE_3',
'MODULES.MODULE_2.FEATURE_4'
]
},

{
number: '03',
category: 'MODULES.MODULE_3.CATEGORY',
title: 'MODULES.MODULE_3.TITLE',
description: 'MODULES.MODULE_3.DESCRIPTION',
image: 'assets/modules/reportes.png',
features: [
'MODULES.MODULE_3.FEATURE_1',
'MODULES.MODULE_3.FEATURE_2',
'MODULES.MODULE_3.FEATURE_3',
'MODULES.MODULE_3.FEATURE_4'
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