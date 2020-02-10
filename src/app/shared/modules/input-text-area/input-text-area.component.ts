import {
  HighlighterService,
  initialState
} from './services/highlighter.service';
import { HighLighterState, TextArea, HighlithedSelection } from './models';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-area-container',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputTextAreaComponent implements OnInit {
  @Output()
  highlightSelections: EventEmitter<HighlithedSelection[]> = new EventEmitter<
    HighlithedSelection[]
  >();

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
    this.highlightState$ = this.highlighterService.getHighlightState();
  }

  onHighlightsSelections(textArea: TextArea) {
    this.highlighterService.updateSelectionState(textArea);
    this.emitHightlighSelection(textArea.selections);
  }

  onGettingScrollTopTextAre(scrollTop: number) {
    this.textAreaScrollTop = scrollTop;
  }

  undoTextAreaChange() {
    this.undoTextAreaValue();
  }

  onListenTextAreaChange(changes: string) {
    if (!changes) {
      this.undoTextAreaValue();
    }
  }

  private undoTextAreaValue() {
    const textAreainitialState = initialState.textArea;
    this.highlighterService.updateSelectionState(textAreainitialState);
    this.emitHightlighSelection(textAreainitialState.selections);
  }

  private emitHightlighSelection(selections: HighlithedSelection[]) {
    this.highlightSelections.emit(selections);
  }
}
