import { InputTextAreaModule } from './modules/input-text-area/input-text-area.module';
import { RadioColorPickerComponent } from './components/radio-color-picker/radio-color-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterColorComponent } from './components/filter-color/filter-color.component';
import { TextAreaService } from './modules/input-text-area/services/text-area.service';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  imports: [CommonModule, InputTextAreaModule],
  declarations: [
    RadioColorPickerComponent,
    FilterColorComponent,
    ErrorMessageComponent
  ],
  exports: [
    CommonModule,
    InputTextAreaModule,

    RadioColorPickerComponent,
    FilterColorComponent,
    ErrorMessageComponent
  ],
  providers: [TextAreaService]
})
export class SharedModule {}
