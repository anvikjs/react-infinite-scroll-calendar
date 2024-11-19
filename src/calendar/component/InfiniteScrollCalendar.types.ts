export interface InfiniteScrollCalendarProps {
  visibleDate?: Date;
  isMultipleSelect?: Boolean;
  inifiniteScroll?: Boolean;
  handleDateSelect?: Function;
  selectedDates?: Array<string>;
  disabledDates?: Array<string>;
  renderMinDate?: Date;
  renderMaxDate?: Date;
  calendarHeight?: number;
  calendarWidth?: number;
  calendarHeaderContainerClass?: string;
  calendarDateContainerClass?: string;
  calendarContainerClass?: string;
}

export interface DateLayoutProps {
  displayText: string;
  isCurrentDate: Boolean;
  dateObj?: Date;
  firstDayStyle?: Record<any, any>;
  date?: string;
  handleDaySelect?: Function;
  isDisabled?: Boolean;
  isDateSelected?: Boolean;
}

export interface DayLayoutProps {
  displayText: string;
}

export interface MonthHeadProps {
  displayMonth: string;
  displayYear: string;
}
