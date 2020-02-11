import { TextAreaService } from '../services/text-area.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TextArea, HighLighterState, Highlight } from '../models';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaComponent {
  @Output()
  selection: EventEmitter<TextArea> = new EventEmitter<TextArea>();

  @Output()
  scrollTop: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  changeValue: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  colorHighlights: string;

  @Input()
  highLighterState: HighLighterState;

  textAreaScrollTop: number;
  highlightSelection: Highlight;

  constructor(private textAreaService: TextAreaService) {}

  onGettingHighlightsSelection(selection: Highlight) {
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

  onTextAreaChange(textValue: string) {
    this.changeValue.emit(textValue);
  }

  private emitUpdatedHighlights(textAreaHighlights: TextArea) {
    this.selection.emit(textAreaHighlights);
  }

  private getSelectionMappedIntoTextArea(selection: Highlight): TextArea {
    const {
      selectionStart: start,
      selectionEnd: end,
      text,
      colorClassName: classNameColor,
      value: currentValue
    } = selection;

    return {
      currentValue,
      currentSelection: {
        start,
        end,
        text,
        classNameColor
      }
    };
  }
}
