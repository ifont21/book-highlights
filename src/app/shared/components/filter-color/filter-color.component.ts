import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { Color } from '../radio-color-picker/radio-color-picker.component';

@Component({
  selector: 'app-filter-color',
  templateUrl: './filter-color.component.html',
  styleUrls: ['./filter-color.component.scss']
})
export class FilterColorComponent implements OnChanges {
  @Input()
  colors: Color[];

  @Output()
  selected: EventEmitter<string[]> = new EventEmitter<string[]>();

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
    this.colorsToUse = this.initColorSelected(this.colorsToUse);
  }

  selectColorToFilter(index: number): void {
    this.colorsToUse = this.toggleColorSelected(this.colorsToUse, index);
    this.emitSelectedColors(this.colorsToUse);
  }

  private emitSelectedColors(colors: Color[]) {
    const selectedColors = this.getSelectedColors(colors);
    this.selected.emit(selectedColors);
  }

  private initColorSelected(colors: Color[]) {
    return colors.map(color => ({ ...color, selected: false }));
  }

  private toggleColorSelected(colors: Color[], index: number) {
    return colors.map((color, i) => {
      return index === i ? { ...color, selected: !color.selected } : color;
    });
  }

  private getSelectedColors(colors: Color[]): string[] {
    return this.colorsToUse
      .filter(color => color.selected)
      .map(color => this.extractColorFromClassName(color.className));
  }

  private extractColorFromClassName(className: string) {
    const words = className.split('-');
    return (words && words.length && words[2]) || '';
  }

  private generateColorsWithClassName(colors: Color[]) {
    return colors.map(color => ({
      ...color,
      className: `highlight-option-${color.value}`
    }));
  }
}
