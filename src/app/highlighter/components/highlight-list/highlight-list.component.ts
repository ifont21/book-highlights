import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';
@Component({
  selector: 'app-highlight-list',
  templateUrl: './highlight-list.component.html',
  styleUrls: ['./highlight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightListComponent {
  @Input()
  highlights: HighlithedSelection[];

  @Input()
  filters: string[];

  constructor() {}
}
