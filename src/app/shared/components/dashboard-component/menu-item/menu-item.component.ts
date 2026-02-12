import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  imports:[
    IconComponent,
    CommonModule,
  ],
  standalone:true
})
export class MenuItemComponent implements OnInit {

  @Input() items: MenuItem[] = [];
  @Input() selectedId!: string;

  @Output() itemSelected = new EventEmitter<MenuItem>();

  selectItem(item: MenuItem) {
    this.itemSelected.emit(item);
  }

  isSelected(item: MenuItem): boolean {
    return item.id === this.selectedId;
  }

  constructor() { }

  ngOnInit() {
  }

}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
}