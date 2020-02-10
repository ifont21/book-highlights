import { HighLighterState, TextArea } from '../models/state';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const initialState: HighLighterState = {
  textArea: { selections: [], currentValue: null, currentSelection: null }
};

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
}
