import { Injectable } from '@angular/core';
import {
  HighlithedSelection,
  HighLighterState,
  TextArea
} from '@app/shared/services/highlighter.service';
import { HighlightParser } from './highlights-parser';

@Injectable()
export class TextAreaService {
  private highlightParser: HighlightParser;

  constructor() {}

  getHighlightsOnTextArea(
    currentState: HighLighterState,
    changes: TextArea
  ): TextArea {
    const selections = this.getUpdatedSelectionsFromState(
      currentState,
      changes.currentSelection
    );

    this.highlightParser = new HighlightParser(
      changes.currentValue,
      selections
    );

    const currentValue = this.highlightParser.getMarkedTextValue();

    const newTextAreaState = {
      ...currentState.textArea,
      currentValue,
      currentSelection: changes.currentSelection,
      selections
    };

    return newTextAreaState;
  }

  private getUpdatedSelectionsFromState(
    currentState: HighLighterState,
    newSelection: HighlithedSelection
  ): HighlithedSelection[] {
    const selections = [...currentState.textArea.selections, newSelection];
    return selections;
  }
}
