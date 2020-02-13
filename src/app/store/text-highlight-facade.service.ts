import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as selectors from './text-highlight.selector';
import * as Action from './text-highlight.action';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';
import TextHighlightState from './text-highlight.state';
import { Observable } from 'rxjs';
import { ErrorHighlight } from '@app/shared/modules/input-text-area/services/highlighter.service';

@Injectable({
  providedIn: 'root'
})
export class TextHighlightFacadeService {
  constructor(private store: Store<{ textHighlight: TextHighlightState }>) {}

  getError(): Observable<ErrorHighlight> {
    return this.store.pipe(select(selectors.getError));
  }

  getHighlights(): Observable<HighlithedSelection[]> {
    return this.store.pipe(select(selectors.getHighlights));
  }

  getFilters(): Observable<string[]> {
    return this.store.pipe(select(selectors.getFilters));
  }

  getSelectedColor(): Observable<string> {
    return this.store.pipe(select(selectors.getSelectedColor));
  }

  selectFilters(filters: string[]): void {
    this.store.dispatch(Action.SelectFilters({ payload: filters }));
  }

  selectColor(color: string): void {
    this.store.dispatch(Action.SelectColor({ payload: color }));
  }

  updateHighlights(highlights: HighlithedSelection[]): void {
    this.store.dispatch(Action.UpdateHighlights({ payload: highlights }));
  }

  setError(error: ErrorHighlight): void {
    this.store.dispatch(Action.SetError({ payload: error }));
  }
}
