import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TextHighlightFacadeService } from '@app/store';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';

@Component({
  selector: 'app-highlight-list-container',
  templateUrl: './highlight-list-container.component.html'
})
export class HighlightListContainerComponent implements OnInit {
  highlights$: Observable<HighlithedSelection[]>;

  filters$: Observable<string[]>;

  constructor(private storeHighlight: TextHighlightFacadeService) {}

  ngOnInit(): void {
    this.highlights$ = this.storeHighlight.getHighlights();
    this.filters$ = this.storeHighlight.getFilters();
  }
}
