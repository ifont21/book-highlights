import { SupportedColors } from './../../constants/supported-colors';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Color } from '@app/shared/modules/input-text-area/models';

@Component({
  selector: 'app-radio-color-picker',
  templateUrl: './radio-color-picker.component.html',
  styleUrls: ['./radio-color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioColorPickerComponent implements OnChanges {
  @Input()
  colors: Color[];

  @Output()
  selected: EventEmitter<any> = new EventEmitter<any>();

  get colorsWithClassName() {
    return this.colorsToUse;
  }

  private colorsToUse: Color[];

  constructor() {}

  ngOnChanges({ colors }: SimpleChanges): void {
    const currentColor = colors && colors.currentValue;

    if (!currentColor) {
      return;
    }

    this.colorsToUse = this.generateColorsWithClassName(currentColor);
  }

  selectAndUpdateColor(index: number): void {
    const colorSelection = this.singleColorSelection(index);
    this.colorsToUse = this.colorsToUse.map(colorSelection);
    this.updateSelected(this.colorsToUse);
  }

  private singleColorSelection = (selected: number) => (
    color: Color,
    index: number
  ) => {
    if (selected !== index) {
      return { ...color, selected: false };
    }
    return { ...color, selected: true };
    // tslint:disable-next-line: semicolon
  };

  private updateSelected(colors: Color[]) {
    const selectedFound = colors.find(color => color.selected);
    this.selected.emit(selectedFound.value);
  }

  private generateColorsWithClassName(colors: Color[]) {
    return colors.map(color => ({
      ...color,
      className: `highlight-option-${color.value}`
    }));
  }
}
