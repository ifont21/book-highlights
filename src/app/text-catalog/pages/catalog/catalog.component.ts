import { Component } from '@angular/core';
import { SupportedColors } from '@app/shared/constants';
import { HighlightSelection } from '@app/shared/components/directives/highligther.directive';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  colors: any = [
    { value: SupportedColors.RED, label: 'Careful', selected: false },
    { value: SupportedColors.YELLOW, label: 'Warning', selected: false },
    { value: SupportedColors.GREEN, label: 'Good', selected: false }
  ];

  selectedColor: string;

  constructor() {}

  getColorSelected(selected: string) {
    this.selectedColor = selected;
  }
}
