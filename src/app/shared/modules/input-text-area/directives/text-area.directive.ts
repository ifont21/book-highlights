import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  SimpleChange
} from '@angular/core';
import { HighLighterState } from '../models';

@Directive({
  selector: '[appTextArea]'
})
export class TextAreaDirective implements OnChanges {
  @Input()
  appTextArea: HighLighterState;

  get element() {
    return this.el && this.el.nativeElement;
  }

  constructor(private el: ElementRef) {}

  ngOnChanges({ appTextArea }: SimpleChanges): void {
    this.listenStateChanges(appTextArea);
  }

  private listenStateChanges(state: SimpleChange) {
    const currentState: HighLighterState = state && state.currentValue;

    if (!currentState) {
      return;
    }

    if (!currentState.textArea.currentValue) {
      this.cleanTextArea();
    }
  }

  private cleanTextArea() {
    this.element.value = '';
  }
}
