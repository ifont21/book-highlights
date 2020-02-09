import {
  HighLighterState,
  HighlighterService,
  TextArea
} from './../../services/highlighter.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { HighlightSelection } from '../directives/highligther.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-area-container',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputTextAreaComponent implements OnInit {
  @Input()
  set colorHighlights(color: string) {
    this.highlightColorClassName = color ? `highlight-${color}` : '';
  }

  get colorHighlights() {
    return this.highlightColorClassName;
  }

  highlightState$: Observable<HighLighterState>;

  textAreaScrollTop: number;

  private highlightColorClassName: string;

  constructor(private highlighterService: HighlighterService) {}

  ngOnInit(): void {
    this.highlightState$ = this.highlighterService.getState();
  }

  onHighlightsSelections(textArea: TextArea) {
    this.highlighterService.updateSelectionState(textArea);
  }

  onGettingScrollTopTextAre(scrollTop: number) {
    this.textAreaScrollTop = scrollTop;
  }
}
