import { Component } from '@angular/core';
import { SupportedColors } from '@app/shared/constants';
import { HighlithedSelection } from '@app/shared/services/highlighter.service';

@Component({
  selector: 'app-highligher',
  templateUrl: './highlighter.component.html',
  styleUrls: ['./highlighter.component.scss']
})
export class HighlighterComponent {
  colors: any = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  selectedColor: string;
  colorFilters: string[];

  currentHighlights: HighlithedSelection[];

  constructor() {}

  getColorSelected(selected: string) {
    this.selectedColor = selected;
  }

  getSelectionHighlights(selections: HighlithedSelection[]) {
    this.currentHighlights = selections;
  }

  getColorFilters(filters: string[]) {
    this.colorFilters = filters;
  }
}
