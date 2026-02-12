import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';

@Component({
    selector: 'app-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
    imports: [
      CommonModule
    ],
    standalone: true
})
export class LabelComponent implements OnInit {
    public ts = inject(TranslateService);
    @Input() size: string = 'text-bh1';    // tamaño por defecto
    @Input() color: string = 'text-fg-primary'; // color por defecto
    @Input() weight: string = 'weight-regular';      // peso tipográfico

    constructor() { }
    ngOnInit() {
    }
}
