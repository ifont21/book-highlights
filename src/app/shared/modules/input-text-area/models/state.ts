export interface HighlithedSelection {
  start?: number;
  end?: number;
  text?: string;
  classNameColor?: string;
}

export interface TextArea {
  currentValue?: string;
  selections?: HighlithedSelection[];
  currentSelection?: HighlithedSelection;
}

export interface HighLighterState {
  textArea?: TextArea;
}
