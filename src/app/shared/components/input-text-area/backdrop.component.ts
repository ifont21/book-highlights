import { HighLighterState } from './../../services/highlighter.service';
import { Component, Input } from '@angular/core';
import { HighlightSelection } from '../../directives/highligther.directive';

@Component({
  selector: 'app-backdrop',
  templateUrl: 'backdrop.component.html'
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
