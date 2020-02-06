import { RadioColorPickerComponent } from './components/radio-color-picker/radio-color-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [RadioColorPickerComponent],
  exports: [
    CommonModule,
    RadioColorPickerComponent
  ]
})
export class SharedModule {}
