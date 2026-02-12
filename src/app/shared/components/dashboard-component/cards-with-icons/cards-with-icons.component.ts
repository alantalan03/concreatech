import { Component, inject, Input, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { TranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-cards-with-icons',
  templateUrl: './cards-with-icons.component.html',
  styleUrls: ['./cards-with-icons.component.scss'],
  imports:[
    IconComponent,
    CommonModule,
    TranslatePipe
  ],
  standalone:true
})
export class CardsWithIconsComponent implements OnInit {
  @Input() cards=[];
  public ts = inject(TranslateService);

  constructor() { }

  ngOnInit() {
    console.log(this.cards);
  }

}
