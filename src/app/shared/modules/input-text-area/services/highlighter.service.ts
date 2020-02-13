import {
  HighLighterState,
  TextArea,
  HighlithedSelection
} from '../models/state';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const initialState: HighLighterState = {
  textArea: { selections: [], currentValue: null, currentSelection: null }
};

export interface ErrorHighlight {
  highlighted: 'invalid' | null;
}

@Injectable()
export class HighlighterService {
  private highlightedState$: BehaviorSubject<
    HighLighterState
  > = new BehaviorSubject<HighLighterState>(initialState);

  constructor() {}

  getHighlightState() {
    return this.highlightedState$.asObservable();
  }

  updateSelectionState(textArea: TextArea) {
    const currentState: HighLighterState = this.highlightedState$.value;

    const newState = {
      ...currentState,
      textArea
    };

    this.highlightedState$.next(newState);
  }

  validateSelections(lastSelection: TextArea): ErrorHighlight {
    const currentState: HighLighterState = this.highlightedState$.value;

    const selection = lastSelection && lastSelection.currentSelection;

    if (!selection) {
      return { highlighted: null };
    }

    const previousSelections =
      (currentState &&
        currentState.textArea &&
        currentState.textArea.selections) ||
      [];

    if (!previousSelections.length) {
      return { highlighted: null };
    }

    const hasErrorOnHighlighted = this.hasErrorsOnHighlighted(
      previousSelections,
      selection
    );

    return hasErrorOnHighlighted
      ? { highlighted: 'invalid' }
      : { highlighted: null };
  }

  private hasErrorsOnHighlighted(
    previousSelections: HighlithedSelection[],
    selection: HighlithedSelection
  ): boolean {
    const hasErrors = previousSelections.some(previous => {
      const previousStartToEndSelection = [previous.start, previous.end];

      const fromBeforePreviousSelection = this.fromPreviousSelection('before');
      const fromAfterPreviousSelection = this.fromPreviousSelection('after');

      const isStartBeforePreviousSelection = fromBeforePreviousSelection(
        previousStartToEndSelection,
        selection,
        'start'
      );

      const isEndBeforePreviousSelection = fromBeforePreviousSelection(
        previousStartToEndSelection,
        selection,
        'end'
      );

      const isStartAfterPreviousSelection = fromAfterPreviousSelection(
        previousStartToEndSelection,
        selection,
        'start'
      );

      const isEndAfterPreviousSelection = fromAfterPreviousSelection(
        previousStartToEndSelection,
        selection,
        'end'
      );

      if (
        (isStartBeforePreviousSelection && isEndBeforePreviousSelection) ||
        (isStartAfterPreviousSelection && isEndAfterPreviousSelection)
      ) {
        return false;
      } else {
        return true;
      }
    });

    return hasErrors;
  }

  private fromPreviousSelection = (comparison: 'after' | 'before') => (
    previousStartToEndSelection: number[],
    lastSelection: HighlithedSelection,
    key: string
  ) => {
    const selections = previousStartToEndSelection.filter(prev =>
      this.compareSelection(prev, comparison, lastSelection[key])
    );
    return selections.length > 1;
    // tslint:disable-next-line: semicolon
  };

  private compareSelection(
    previous: number,
    comparison: 'after' | 'before',
    last: number
  ): boolean {
    if (comparison === 'before') {
      return last < previous;
    }
    if (comparison === 'after') {
      return last > previous;
    }
  }
}
