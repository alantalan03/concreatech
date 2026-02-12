import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { TranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-chip',
  standalone: true, // <-- requerido si usas 'imports'
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  imports:[
    CommonModule,
    IconComponent,
    TranslatePipe
  ]
})
export class ChipComponent implements OnInit {
  public ts = inject(TranslateService);
  
  @Input() label:string;
  @Input() icon:string;
  @Input() color:string;
  @Input() chipClass = 'chip-brand'; // o 'chip-blue', 'chip-green' dinámicamente
  constructor() { }

  ngOnInit() {
  }

}
