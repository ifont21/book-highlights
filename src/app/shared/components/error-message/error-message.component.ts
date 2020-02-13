import { ErrorHighlight } from '@app/shared/modules/input-text-area/services/highlighter.service';
import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent implements OnChanges {
  @Input()
  errorHighlight: ErrorHighlight;

  errorMessage: string;

  private readonly HIGHLIGHTED_INVALID_ERROR =
    'You are Trying to Highlight some words you already did, Please Check';

  constructor() {}

  ngOnChanges({ errorHighlight }: SimpleChanges): void {
    const error: ErrorHighlight = errorHighlight && errorHighlight.currentValue;

    if (!error) {
      return;
    }

    this.errorMessage =
      error.highlighted === 'invalid' ? this.HIGHLIGHTED_INVALID_ERROR : '';
  }
}
