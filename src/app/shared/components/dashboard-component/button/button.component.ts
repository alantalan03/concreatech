import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    IconComponent,
    LoaderComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() buttonClass: string = 'btn-sm-primary';
  @Input() label: string = '';
  @Input() showLabel: boolean = true;
  @Input() showIcon: boolean = false;
  @Input() icon: string = '';
  @Input() colorIcon: string = '';
  @Input() disabled: boolean = false;
  @Input() isLoader: boolean = false;
}