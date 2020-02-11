import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Highlight, HighLighterState } from '../models';
import { TextAreaDirective } from './text-area.directive';
import { initialState } from '../services/highlighter.service';

@Component({
  template: `
    <textarea [appTextArea]="state"></textarea>
  `
})
class TestHighligtherComponent {
  state: HighLighterState = {
    textArea: {
      selections: [],
      currentValue: 'Text hereeeeee',
      currentSelection: {
        start: 0,
        end: 10,
        text: 'Hello World',
        classNameColor: 'highlight-red'
      }
    }
  };

  constructor() {}
}

describe('TextAreaDirective', () => {
  const mockHighlightState: HighLighterState = initialState;

  let component: TestHighligtherComponent;
  let fixture: ComponentFixture<TestHighligtherComponent>;
  let textAreaEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHighligtherComponent, TextAreaDirective]
    });

    fixture = TestBed.createComponent(TestHighligtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    textAreaEl = fixture.debugElement.query(By.css('textarea'));
  });

  it('should clean text value when a undo state has emitted', () => {
    expect(textAreaEl.nativeElement.value).toBe('');
  });
});
