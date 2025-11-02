export type ColorWord = 'RED' | 'GREEN' | 'BLUE' | 'YELLOW';

export type StroopEvent = {
  trialIndex: number;
  word: ColorWord;
  fontColor: ColorWord;
  isCongruent: boolean;
  choice?: ColorWord;
  isCorrect?: boolean;
  rtMs?: number;
  ts: number;
};

export type GoNoGoEvent = {
  trialIndex: number;
  isNoGo: boolean;
  responded: boolean;   // pressed space
  isCorrect: boolean;   // correct withhold on NoGo, or correct press on Go
  rtMs?: number;
  ts: number;
};
