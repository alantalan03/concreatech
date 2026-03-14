import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Check, Cpu, Cloud, Database } from 'lucide-angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule,
    LucideAngularModule
  ],
  encapsulation: ViewEncapsulation.None, // ⬅️ CLAVE
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  Check = Check;
  Cpu = Cpu;
  Cloud = Cloud;
  Database = Database;

  constructor() { }

  ngOnInit() {
  }

}
