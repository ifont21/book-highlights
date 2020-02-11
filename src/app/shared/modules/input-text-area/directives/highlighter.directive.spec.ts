import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { HighligtherDirective } from './highligther.directive';
import { By } from '@angular/platform-browser';
import { Highlight } from '../models';

@Component({
  template: `
    <textarea
      appHighlighter
      (selection)="getSelected($event)"
      (scrollTopPosition)="getScrollTop($event)"
    ></textarea>
  `
})
class TestHighligtherComponent {
  constructor() {}

  getSelected(event: Highlight) {
    // something to execute
  }

  getScrollTop(event) {
    // something to execute
  }
}

describe('HighligtherDirective', () => {
  let component: TestHighligtherComponent;
  let fixture: ComponentFixture<TestHighligtherComponent>;
  let textAreaEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHighligtherComponent, HighligtherDirective]
    });

    fixture = TestBed.createComponent(TestHighligtherComponent);
    component = fixture.componentInstance;
    textAreaEl = fixture.debugElement.query(By.css('textarea'));
  });

  describe('onMouseUp', () => {
    it('should get highlight selected when a mouseup event is emitted', () => {
      const expectedParam = {
        selectionStart: 0,
        selectionEnd: 5,
        value: 'hello world',
        text: 'hello',
        colorClassName: undefined
      };

      const range = 'hello';
      spyOn(window as any, 'getSelection').and.returnValue(range);
      spyOn(component, 'getSelected');

      textAreaEl.nativeElement.value = 'hello world';

      textAreaEl.nativeElement.selectionStart = 0;
      textAreaEl.nativeElement.selectionEnd = 5;

      textAreaEl.triggerEventHandler('mouseup', null);
      fixture.detectChanges();

      expect(component.getSelected).toHaveBeenCalledWith(expectedParam);
    });
  });

  describe('onScrolling', () => {
    it('should emit changes on scrolling in the textArea', () => {
      spyOn(component, 'getScrollTop');

      textAreaEl.triggerEventHandler('scroll', { target: { scrollTop: 10 } });

      expect(component.getScrollTop).toHaveBeenCalledWith(10);
    });
  });
});
