import { Component, Input } from '@angular/core';
import { HighlithedSelection } from '@app/shared/services/highlighter.service';
@Component({
  selector: 'app-highlight-list',
  templateUrl: './highlight-list.component.html',
  styleUrls: ['./highlight-list.component.scss']
})
export class HighlightListComponent {
  @Input()
  highlights: HighlithedSelection[];

  @Input()
  filters: string[];

  constructor() {}
}
