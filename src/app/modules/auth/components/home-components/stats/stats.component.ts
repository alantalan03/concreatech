import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  imports:[
    TranslateModule
  ],
})
export class StatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
