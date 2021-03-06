import { Injectable } from '@angular/core';
import { HighlightParser } from './highlights-parser';
import { HighLighterState, TextArea, HighlithedSelection } from '../models';

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
