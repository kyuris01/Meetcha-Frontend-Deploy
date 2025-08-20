export interface AlternativeEvent {
  title: string;
  start: string;
  end: string;
  extendedProps: AltEventExtendedProps;
}

export interface AltEventExtendedProps {
  index: number;
  failMembers: string[];
  adjustedTime: number;
  startTime: string;
  endTime: string;
  availableNum: number;
  totalNum: number;
  date: string;
}
