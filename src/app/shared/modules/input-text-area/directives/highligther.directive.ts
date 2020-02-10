import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Highlight } from '../models';

@Directive({
  selector: '[appHighlighter]'
})
export class HighligtherDirective {
  @Output()
  selection: EventEmitter<Highlight> = new EventEmitter<Highlight>();

  @Output()
  scrollTopPosition: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  appHighlighter: string;

  constructor(private elRef: ElementRef) {}

  @HostListener('mouseup')
  onMouseUp() {
    this.onHighlightedMouseUp();
  }

  @HostListener('scroll', ['$event'])
  onScrolling(event: any) {
    const scrollTop = event && event.target && event.target.scrollTop;
    this.onEmitScrollPosition(scrollTop);
  }

  private onHighlightedMouseUp() {
    const textAreaElement = this.elRef && this.elRef.nativeElement;

    if (!textAreaElement) {
      return;
    }

    const textAreaChanges = this.getTextAreaValues(textAreaElement, window);

    if (!(textAreaChanges && textAreaChanges.text)) {
      return;
    }

    const changes: Highlight = this.addColorHighlightToChanges(textAreaChanges);

    this.emitTextAreaChanges(changes);
  }

  private onEmitScrollPosition(scrollTop: number) {
    if (!scrollTop) {
      return;
    }

    this.scrollTopPosition.emit(scrollTop);
  }

  private getTextAreaValues(domEl: any, windowObj: Window): Highlight {
    return {
      selectionStart: domEl.selectionStart,
      selectionEnd: domEl.selectionEnd,
      value: domEl.value,
      text: windowObj.getSelection().toString()
    };
  }

  private emitTextAreaChanges(changes: Highlight) {
    if (!changes) {
      return;
    }
    this.selection.emit(changes);
  }

  private addColorHighlightToChanges(changes: Highlight) {
    return {
      ...changes,
      colorClassName: this.appHighlighter
    };
  }
}
