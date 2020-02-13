import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-highligher',
  templateUrl: './highlighter.component.html',
  styleUrls: ['./highlighter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlighterComponent {
  constructor() {}
}
