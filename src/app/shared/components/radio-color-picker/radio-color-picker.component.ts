import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Color {
  value: string;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'app-radio-color-picker',
  templateUrl: './radio-color-picker.component.html',
  styleUrls: ['./radio-color-picker.component.scss']
})
export class RadioColorPickerComponent {
  @Input()
  set colors(value: Color[]) {
    this.colorsToUse = value;
  }

  get colors() {
    return this.colorsToUse;
  }

  @Output()
  selected: EventEmitter<any> = new EventEmitter<any>();

  private colorsToUse: Color[] = [
    { value: '#BC2020', label: '', selected: false },
    { value: '#348574', label: '', selected: false },
    { value: '#ECE629', label: '', selected: false }
  ];

  constructor() {}

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
}
