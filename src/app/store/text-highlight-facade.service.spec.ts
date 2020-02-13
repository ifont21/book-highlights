import { initializeState } from './text-highlight.state';
import { async, TestBed } from '@angular/core/testing';
import { TextHighlightFacadeService } from './text-highlight-facade.service';
import { Store } from '@ngrx/store';
import TextHighlightState from './text-highlight.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('TextHighlightFacadeService', () => {
  let service: jasmine.SpyObj<TextHighlightFacadeService>;
  let store: MockStore<{ textHighlight: TextHighlightState }>;

  const initialState = initializeState();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TextHighlightFacadeService,
        provideMockStore({ initialState })
      ]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(TextHighlightFacadeService);
    store = TestBed.get<Store<any>>(Store);
  });

  it('should service be defined', () => {
    expect(service).toBeDefined();
  });
});
