import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

export interface HighlightSelection {
  text: string;
  value: string;
  selectionStart: number;
  selectionEnd: number;
  colorClassName?: string;
}

@Directive({
  selector: '[appHighlighter]'
})
export class HighligtherDirective {
  @Output()
  selection: EventEmitter<HighlightSelection> = new EventEmitter<
    HighlightSelection
  >();

  @Output()
  scrollTopPosition: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  appHighlighter: string;

  constructor(private elRef: ElementRef) {}

  @HostListener('mouseup')
  onMouseUp() {
    this.onHighlighted();
  }

  @HostListener('scroll', ['$event'])
  onScrolling(event: any) {
    const scrollTop = event && event.target && event.target.scrollTop;
    this.emitTextAreaScrollPosition(scrollTop);
  }

  private onHighlighted() {
    const textAreaElement = this.elRef && this.elRef.nativeElement;

    if (!textAreaElement) {
      return;
    }

    const textAreaChanges = this.getTextAreaValues(textAreaElement, window);

    if (!(textAreaChanges && textAreaChanges.text)) {
      return;
    }

    const changes: HighlightSelection = this.addColorHighlightToChanges(
      textAreaChanges
    );

    this.emitTextAreaChanges(changes);
  }

  private getTextAreaValues(domEl: any, windowObj: Window): HighlightSelection {
    return {
      selectionStart: domEl.selectionStart,
      selectionEnd: domEl.selectionEnd,
      value: domEl.value,
      text: windowObj.getSelection().toString()
    };
  }

  private emitTextAreaChanges(changes: HighlightSelection) {
    if (!changes) {
      return;
    }
    this.selection.emit(changes);
  }

  private addColorHighlightToChanges(changes: HighlightSelection) {
    return {
      ...changes,
      colorClassName: this.appHighlighter
    };
  }

  private emitTextAreaScrollPosition(scrollTop: number) {
    if (!scrollTop) {
      return;
    }
    this.scrollTopPosition.emit(scrollTop);
  }
}
