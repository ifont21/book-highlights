import { Component, OnInit } from '@angular/core';
import { SupportedColors } from '@app/shared/constants';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';
import { Observable } from 'rxjs';
import { TextHighlightFacadeService } from '@app/store/text-highlight-facade.service';
import { TextHighlight } from '@app/store';

@Component({
  selector: 'app-highligher',
  templateUrl: './highlighter.component.html',
  styleUrls: ['./highlighter.component.scss']
})
export class HighlighterComponent implements OnInit {
  colors: any = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  textHighlight$: Observable<TextHighlight>;

  selectedColor: string;
  colorFilters: string[];

  currentHighlights: HighlithedSelection[];

  constructor(private storeService: TextHighlightFacadeService) {}

  ngOnInit(): void {}

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
