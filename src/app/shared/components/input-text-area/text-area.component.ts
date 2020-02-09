import { TextAreaService } from './text-area.service';
import {
  HighLighterState,
  TextArea
} from './../../services/highlighter.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HighlightSelection } from '../directives/highligther.directive';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  providers: [TextAreaService]
})
export class TextAreaComponent {
  @Output()
  selection: EventEmitter<TextArea> = new EventEmitter<TextArea>();

  @Output()
  scrollTop: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  colorHighlights: string;

  @Input()
  highLighterState: HighLighterState;

  textAreaScrollTop: number;
  highlightSelection: HighlightSelection;

  constructor(private textAreaService: TextAreaService) {}

  onGettingHighlightsSelection(selection: HighlightSelection) {
    const textArea: TextArea = this.getSelectionMappedIntoTextArea(selection);

    const newTextAreaState = this.textAreaService.getHighlightsOnTextArea(
      this.highLighterState,
      textArea
    );
    this.emitUpdatedHighlights(newTextAreaState);
  }

  onGettingScrollTopTextArea(scrollTop: number) {
    this.scrollTop.emit(scrollTop);
  }

  private emitUpdatedHighlights(textAreaHighlights: TextArea) {
    this.selection.emit(textAreaHighlights);
  }

  private getSelectionMappedIntoTextArea(
    selection: HighlightSelection
  ): TextArea {
    return {
      currentValue: selection.value,
      currentSelection: {
        start: selection.selectionStart,
        end: selection.selectionEnd,
        text: selection.text,
        classNameColor: selection.colorClassName
      }
    };
  }
}
