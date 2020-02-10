import { Component } from '@angular/core';
import { SupportedColors } from '@app/shared/constants';
import { HighlightSelection } from '@app/shared/directives/highligther.directive';
import { HighlithedSelection } from '@app/shared/services/highlighter.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  colors: any = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  selectedColor: string;
  currentHighlights: HighlithedSelection[];

  constructor() {}

  getColorSelected(selected: string) {
    this.selectedColor = selected;
  }

  getSelectionHighlights(selections: HighlithedSelection[]) {
    this.currentHighlights = selections;
  }
}
