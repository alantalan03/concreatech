import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ChipOption } from 'src/app/core/interfaces/ChipOption';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';

@Component({
  selector: 'app-input-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    IconComponent,
    TranslatePipe
  ]
})
export class InputChipsComponent implements OnChanges {
   public ts = inject(TranslateService);
  @Input() titulo = '';
  @Input() opciones: ChipOption[] = [];
  @Input() valorSeleccionadoId: string | number | null = null;
  @Output() seleccion = new EventEmitter<ChipOption>();

  opcionSeleccionadaId: string | number | null = null;

  ngOnChanges(simpleChanges:SimpleChanges) {
    if (this.valorSeleccionadoId !== this.opcionSeleccionadaId) {
      this.opcionSeleccionadaId = this.valorSeleccionadoId;
    }
  }
  seleccionarOpcion(opcion: ChipOption) {
    if (this.opcionSeleccionadaId === opcion.id) return;
    this.opcionSeleccionadaId = opcion.id;
    this.seleccion.emit(opcion);
  }
}
