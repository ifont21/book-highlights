import { HighlithedSelection } from '../models';

interface TrackSelection {
  selectionEnd: number;
  classNameColor: string;
}

interface TrackText {
  markValueText: string;
  previousTrackedSelections: TrackSelection[];
}

export class HighlightParser {
  constructor(
    private text: string,
    private selections: HighlithedSelection[]
  ) {}

  getMarkedTextValue(): string {
    const latestTrackedSelectionText = this.getLatestTrackedMarkTextSelection(
      this.selections,
      this.text
    );

    return latestTrackedSelectionText;
  }

  private getLatestTrackedMarkTextSelection(
    selections: HighlithedSelection[],
    textAreaValue: string
  ) {
    const initTrack: TrackText = {
      markValueText: textAreaValue,
      previousTrackedSelections: []
    };

    const tracked = selections.reduce(
      this.trackTextBySelection.bind(this),
      initTrack
    );

    return (tracked && tracked.markValueText) || '';
  }

  private trackTextBySelection(
    trackText: TrackText,
    currentSelection: HighlithedSelection
  ) {
    const previousTrackedSelections = this.getTrackedSelectionsByBoundary(
      trackText.previousTrackedSelections,
      currentSelection.end
    );

    const newMeasureLength = this.getMeasureLengthBySelections(
      previousTrackedSelections
    );

    const updatedCurrentSelection = this.getUpdatedSelectionByMeasure(
      currentSelection,
      previousTrackedSelections.length,
      newMeasureLength
    );

    const latestMarkValueText = this.replaceStringSelectionByMarks(
      trackText.markValueText,
      updatedCurrentSelection
    );

    const latestPreviousTrackedSelection = this.getLatestPreviousTrackedSelection(
      trackText.previousTrackedSelections,
      {
        selectionEnd: currentSelection.end,
        classNameColor: currentSelection.classNameColor
      }
    );

    const track = {
      markValueText: latestMarkValueText,
      previousTrackedSelections: latestPreviousTrackedSelection
    };

    return track;
  }

  private getTrackedSelectionsByBoundary(
    previousTrackedSelections: TrackSelection[],
    boundary: number
  ): TrackSelection[] {
    return previousTrackedSelections.filter(end => end.selectionEnd < boundary);
  }

  private replaceStringSelectionByMarks(
    text: string,
    selection: HighlithedSelection
  ): string {
    if (!text) {
      return text;
    }

    const textBefore = text.substring(0, selection.start);
    const textAfter = text.substring(selection.end);
    const classNameColor = selection.classNameColor
      ? ` class="${selection.classNameColor}"`
      : '';

    return `${textBefore}<mark${classNameColor}>${selection.text}</mark>${textAfter}`;
  }

  private getLatestPreviousTrackedSelection(
    previousTrackedSelections: TrackSelection[],
    {
      selectionEnd,
      classNameColor
    }: { selectionEnd: number; classNameColor: string }
  ) {
    const latestPreviousTracked = [
      ...previousTrackedSelections,
      {
        selectionEnd,
        classNameColor
      }
    ];
    return latestPreviousTracked;
  }

  private getUpdatedSelectionByMeasure(
    selection: HighlithedSelection,
    previousTrackedSelectionsLength: number,
    measureLength: number
  ): HighlithedSelection {
    const selectionStart =
      previousTrackedSelectionsLength > 0
        ? selection.start + measureLength
        : selection.start;

    const selectionEnd =
      previousTrackedSelectionsLength > 0
        ? selection.end + measureLength
        : selection.end;

    return {
      ...selection,
      start: selectionStart,
      end: selectionEnd
    };
  }

  private getMeasureLengthBySelections(
    previousTrackedSelections: TrackSelection[]
  ): number {
    const initLength = 0;
    return previousTrackedSelections.reduce(
      this.trackLatestMarkLength.bind(this),
      initLength
    );
  }

  private trackLatestMarkLength(
    lastLength: number,
    tracked: TrackSelection
  ): number {
    return (lastLength += this.getMarkClassLength(tracked.classNameColor));
  }

  private getMarkClassLength(className: string): number {
    const markclassName = className ? ` class="${className}"` : '';
    const markTag = `<mark${markclassName}></mark>`;
    return markTag.length;
  }
}
