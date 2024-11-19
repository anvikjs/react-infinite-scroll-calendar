import { DateLayoutProps } from "../component/InfiniteScrollCalendar.types";

export default function DateLayout({
  displayText,
  isCurrentDate,
  firstDayStyle = {},
  dateObj,
  date = "",
  handleDaySelect = () => {},
  isDisabled = false,
  isDateSelected = false,
}: DateLayoutProps) {
  return (
    <div
      onClick={() => {
        if (isDisabled) {
          return;
        }
        handleDaySelect(date, dateObj);
      }}
      data-date={date}
      className={`date-container js-dateContainer ${
        isCurrentDate ? "today" : ""
      } ${isDisabled ? "disabled-date" : ""} ${
        isDateSelected ? "selected" : ""
      }   `}
      style={{
        ...firstDayStyle,
      }}
    >
      <time>{displayText}</time>
    </div>
  );
}
