import { BackDropComponent } from './components/input-text-area/backdrop.component';
import { TextAreaComponent } from './components/input-text-area/text-area.component';
import { BackDropHighlightDirective } from './components/directives/backdrop-highlight.directive';
import { HighligtherDirective } from './components/directives/highligther.directive';
import { InputTextAreaComponent } from './components/input-text-area/input-text-area.component';
import { RadioColorPickerComponent } from './components/radio-color-picker/radio-color-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RadioColorPickerComponent,
    InputTextAreaComponent,
    TextAreaComponent,
    BackDropComponent,

    HighligtherDirective,
    BackDropHighlightDirective
  ],
  exports: [
    CommonModule,

    RadioColorPickerComponent,
    InputTextAreaComponent,
    TextAreaComponent,
    BackDropComponent,

    HighligtherDirective,
    BackDropHighlightDirective
  ]
})
export class SharedModule {}
