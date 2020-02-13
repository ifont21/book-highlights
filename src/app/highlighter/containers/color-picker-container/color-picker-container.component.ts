import { Component, OnInit } from '@angular/core';
import { TextHighlightFacadeService } from '@app/store';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { SupportedColors } from '@app/shared/constants';
import { Color } from '@app/shared/modules/input-text-area/models';

@Component({
  selector: 'app-color-picker-container',
  templateUrl: './color-picker-container.component.html'
})
export class ColorPickerContainerComponent implements OnInit {
  colorSelected$: Observable<string>;

  initColors$: Observable<Color[]>;

  private colors: any = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  constructor(private storeHighlight: TextHighlightFacadeService) {}

  ngOnInit(): void {
    const selected$ = this.storeHighlight.getSelectedColor();

    this.colorSelected$ = selected$;

    this.initColors$ = this.getInitColor(selected$);
  }

  getColorSelected(selected: string) {
    this.storeHighlight.selectColor(selected);
  }

  private getInitColor(selected$: Observable<string>): Observable<Color[]> {
    return selected$.pipe(
      switchMap(selected => {
        return this.getColorsWithSelected(selected);
      })
    );
  }

  private getColorsWithSelected(selected: string): Observable<Color[]> {
    return of(this.colors).pipe(
      map((colors: Color[]) => {
        return this.processColorsSelected(colors, selected);
      })
    );
  }

  private processColorsSelected(colors: Color[], selected: string): Color[] {
    return colors.map(color => {
      return this.updateColorSelected(color, selected);
    });
  }

  private updateColorSelected(color: Color, selected: string): Color {
    return color.value === selected
      ? { ...color, selected: true }
      : { ...color, selected: false };
  }
}
