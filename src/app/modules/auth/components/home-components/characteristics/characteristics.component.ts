import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from 'src/app/shared/components/dashboard-component/icon/icon.component';

@Component({
  selector: 'app-characteristics',
  standalone:true,
  imports: [CommonModule, TranslateModule,IconComponent],
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss'],
})
export class CharacteristicsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
