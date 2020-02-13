import { TextHighlightFacadeService } from '@app/store/text-highlight-facade.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HighlightListContainerComponent } from './highlight-list-container.component';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';

describe('HighlightListContainerComponent', () => {
  let component: HighlightListContainerComponent;
  let fixture: ComponentFixture<HighlightListContainerComponent>;
  let store: jasmine.SpyObj<TextHighlightFacadeService>;

  const mockHighlights: HighlithedSelection[] = [
    {
      start: 0,
      end: 5,
      text: 'hello',
      classNameColor: ''
    }
  ];

  const mockStoreSpy = jasmine.createSpyObj('TextHighlightFacadeService', {
    getHighlights: of(mockHighlights),
    getFilters: of(['red', 'green'])
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightListContainerComponent],
      imports: [],
      providers: [
        { provide: TextHighlightFacadeService, useValue: mockStoreSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(TextHighlightFacadeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should get the filters applied', done => {
      component.filters$.subscribe(filters => {
        const expectResult = ['red', 'green'];

        expect(filters).toEqual(expectResult);
        done();
      });
    });

    it('should get the highlights', done => {
      component.highlights$.subscribe(highlights => {
        const expectResult = mockHighlights;

        expect(highlights).toEqual(expectResult);
        done();
      });
    });
  });
});
