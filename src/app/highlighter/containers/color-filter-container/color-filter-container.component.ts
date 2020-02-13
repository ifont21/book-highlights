import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TextHighlightFacadeService } from '@app/store';
import { SupportedColors } from '@app/shared/constants';

@Component({
  selector: 'app-color-filter-container',
  templateUrl: './color-filter-container.component.html'
})
export class ColorFilterContainerComponent {
  colors: any = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  constructor(private storeHighlight: TextHighlightFacadeService) {}

  getColorFilters(filters: string[]) {
    this.storeHighlight.selectFilters(filters);
  }
}
