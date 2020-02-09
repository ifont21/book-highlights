import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { HighLighterState } from '@app/shared/services/highlighter.service';

@Directive({
  selector: '[appBackDropHighlight]'
})
export class BackDropHighlightDirective implements OnChanges {
  @Input()
  appBackDropHighlight: HighLighterState;

  @Input()
  textAreaScrollTop: number;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges({
    appBackDropHighlight,
    textAreaScrollTop
  }: SimpleChanges): void {
    const currentSelection: HighLighterState =
      appBackDropHighlight && appBackDropHighlight.currentValue;

    const currentTextAreaScrollTop =
      textAreaScrollTop && textAreaScrollTop.currentValue;

    const highlightElm = this.elRef.nativeElement.getElementsByClassName(
      'app-text-area__highlights'
    )[0];

    if (currentSelection) {
      this.renderer.addClass(highlightElm, 'app-text-area--mark');
      highlightElm.innerHTML = currentSelection.textArea.currentValue;
    }

    if (currentTextAreaScrollTop) {
      const backDropElm = document.getElementsByClassName(
        'app-text-area__backdrop'
      )[0];
      backDropElm.scrollTop = currentTextAreaScrollTop;
    }
  }
}
