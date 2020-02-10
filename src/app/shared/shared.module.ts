import { BackDropComponent } from './components/input-text-area/backdrop.component';
import { TextAreaComponent } from './components/input-text-area/text-area.component';
import { BackDropHighlightDirective } from './directives/backdrop-highlight.directive';
import { HighligtherDirective } from './directives/highligther.directive';
import { InputTextAreaComponent } from './components/input-text-area/input-text-area.component';
import { RadioColorPickerComponent } from './components/radio-color-picker/radio-color-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterColorComponent } from './components/filter-color/filter-color.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RadioColorPickerComponent,
    InputTextAreaComponent,
    TextAreaComponent,
    BackDropComponent,
    FilterColorComponent,

    HighligtherDirective,
    BackDropHighlightDirective
  ],
  exports: [
    CommonModule,

    RadioColorPickerComponent,
    InputTextAreaComponent,
    TextAreaComponent,
    BackDropComponent,
    FilterColorComponent,

    HighligtherDirective,
    BackDropHighlightDirective
  ]
})
export class SharedModule {}
