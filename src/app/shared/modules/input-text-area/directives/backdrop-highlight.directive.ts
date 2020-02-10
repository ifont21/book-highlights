import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { HighLighterState } from '../models';

@Directive({
  selector: '[appBackDropHighlight]'
})
export class BackDropHighlightDirective implements OnChanges {
  @Input()
  appBackDropHighlight: HighLighterState;

  @Input()
  textAreaScrollTop: number;

  get element() {
    return this.elRef && this.elRef.nativeElement;
  }

  private readonly backDropClassName = 'app-text-area__backdrop';
  private readonly markTagClassName = 'app-text-area--mark';
  private readonly highlightElmClassName = 'app-text-area__highlights';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges({
    appBackDropHighlight,
    textAreaScrollTop
  }: SimpleChanges): void {
    const currentSelection: HighLighterState =
      appBackDropHighlight && appBackDropHighlight.currentValue;

    const currentTextAreaScrollTop =
      textAreaScrollTop && textAreaScrollTop.currentValue;

    const highlightElm = this.getHighlightDOMelement();

    if (currentSelection) {
      this.AddMarkClassToHighlightElm(highlightElm);
      this.AppendTextAreaValueToHighlightElement(
        highlightElm,
        currentSelection.textArea.currentValue
      );
    }

    if (currentTextAreaScrollTop) {
      this.syncUpScrollTopWithTextArea(currentTextAreaScrollTop);
    }
  }

  private syncUpScrollTopWithTextArea(currentTextAreaScrollTop) {
    const backDropElm = document.getElementsByClassName(
      this.backDropClassName
    )[0];
    backDropElm.scrollTop = currentTextAreaScrollTop;
  }

  private AddMarkClassToHighlightElm(highlightElm: any) {
    this.renderer.addClass(highlightElm, this.markTagClassName);
  }

  private AppendTextAreaValueToHighlightElement(
    highlightElm: any,
    textValue: string
  ) {
    highlightElm.innerHTML = textValue;
  }

  private getHighlightDOMelement() {
    const domResult = this.element.getElementsByClassName(
      this.highlightElmClassName
    );
    return domResult && domResult.length && domResult[0];
  }
}
