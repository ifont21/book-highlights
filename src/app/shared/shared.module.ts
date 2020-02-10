import { InputTextAreaModule } from './modules/input-text-area/input-text-area.module';
import { RadioColorPickerComponent } from './components/radio-color-picker/radio-color-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterColorComponent } from './components/filter-color/filter-color.component';

@NgModule({
  imports: [CommonModule, InputTextAreaModule],
  declarations: [
    RadioColorPickerComponent,
    FilterColorComponent
  ],
  exports: [
    CommonModule,
    InputTextAreaModule,

    RadioColorPickerComponent,
    FilterColorComponent
  ]
})
export class SharedModule {}
