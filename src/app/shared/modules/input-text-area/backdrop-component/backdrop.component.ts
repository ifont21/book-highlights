import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { HighLighterState } from '../models';

@Component({
  selector: 'app-backdrop',
  templateUrl: 'backdrop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackDropComponent {
  @Input()
  colorHighlights: string;

  @Input()
  highLighterState: HighLighterState;

  @Input()
  textAreaScrollTop: number;

  constructor() {}
}
