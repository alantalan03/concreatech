import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/shared/components/dashboard-component/button/button.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports:[
    TranslateModule,
    ButtonComponent
  ],
  encapsulation: ViewEncapsulation.None // ⬅️ CLAVE
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
