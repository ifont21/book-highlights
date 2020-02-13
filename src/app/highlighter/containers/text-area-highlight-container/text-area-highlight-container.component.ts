import { ErrorHighlight } from './../../../shared/modules/input-text-area/services/highlighter.service';
import { Component, OnInit } from '@angular/core';
import { TextHighlightFacadeService } from '@app/store';
import { Observable } from 'rxjs';
import { SupportedColors } from '@app/shared/constants';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';

@Component({
  selector: 'app-text-area-highlight-container',
  templateUrl: './text-area-highlight-container.component.html'
})
export class TextAreaHighlightContainerComponent implements OnInit {
  color$: Observable<string>;
  errorHighlight$: Observable<ErrorHighlight>;

  constructor(private storeHighlight: TextHighlightFacadeService) {}

  ngOnInit(): void {
    this.color$ = this.storeHighlight.getSelectedColor();
    this.errorHighlight$ = this.storeHighlight.getError();
  }

  getSelectionHighlights(selections: HighlithedSelection[]) {
    this.storeHighlight.updateHighlights(selections);
  }

  getErrorHighlight(error: ErrorHighlight) {
    this.storeHighlight.setError(error);
  }
}
