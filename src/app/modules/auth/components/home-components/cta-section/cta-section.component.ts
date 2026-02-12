import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cta-section',
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.scss'],
  imports:[TranslateModule]
})
export class CtaSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
