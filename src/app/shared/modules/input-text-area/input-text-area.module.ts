import { TextAreaDirective } from './directives/text-area.directive';
import { HighlighterService } from './services/highlighter.service';

import { BackDropComponent } from './backdrop-component/backdrop.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { InputTextAreaComponent } from './input-text-area.component';
import { NgModule } from '@angular/core';
import { HighligtherDirective } from './directives/highligther.directive';
import { BackDropHighlightDirective } from '@app/shared/modules/input-text-area/directives/backdrop-highlight.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InputTextAreaComponent,
    TextAreaComponent,
    BackDropComponent,

    HighligtherDirective,
    BackDropHighlightDirective,
    TextAreaDirective
  ],
  imports: [CommonModule],
  exports: [
    InputTextAreaComponent,
    TextAreaComponent,
    BackDropComponent
  ],
  providers: [HighlighterService]
})
export class InputTextAreaModule {}
