import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackDropComponent } from './backdrop.component';
import { BackDropHighlightDirective } from '../directives/backdrop-highlight.directive';

describe('BackDropComponent', () => {
  let component: BackDropComponent;
  let fixture: ComponentFixture<BackDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackDropComponent, BackDropHighlightDirective],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackDropComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
