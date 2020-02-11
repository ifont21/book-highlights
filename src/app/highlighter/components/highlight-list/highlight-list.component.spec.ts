import { HighlightFilterPipe } from './../../pipes/highlight-filter.pipe';

import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighlightListComponent } from './highlight-list.component';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';
import { By } from '@angular/platform-browser';

describe('HighlightListComponent', () => {
  let component: HighlightListComponent;
  let fixture: ComponentFixture<HighlightListComponent>;

  const mockHighlights: HighlithedSelection[] = [
    {
      start: 0,
      end: 4,
      text: 'some Text',
      classNameColor: 'highlight-red'
    },
    {
      start: 5,
      end: 10,
      text: 'Text Two',
      classNameColor: 'highlight-green'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightListComponent, HighlightFilterPipe],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightListComponent);
    component = fixture.componentInstance;

    component.filters = [];
    component.highlights = mockHighlights;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if highlights are rendered correctly', () => {
    const elements = fixture.debugElement.query(By.css('.highlights__item'))
      .nativeElement;
    expect(elements.toString().includes(mockHighlights[0].text));
    expect(elements.toString().includes(mockHighlights[1].text));
  });
});
