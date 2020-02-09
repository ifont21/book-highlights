import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface HighlithedSelection {
  start?: number;
  end?: number;
  text?: string;
  classNameColor?: string;
}

export interface TextArea {
  currentValue?: string;
  selections?: HighlithedSelection[];
  currentSelection?: HighlithedSelection;
}

export interface HighLighterState {
  textArea?: TextArea;
}

const initialState: HighLighterState = {
  textArea: { selections: [], currentValue: null, currentSelection: null }
};

@Injectable({
  providedIn: 'root'
})
export class HighlighterService {
  private highlightedState$: BehaviorSubject<
    HighLighterState
  > = new BehaviorSubject<HighLighterState>(initialState);

  constructor() {}

  getState() {
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
