import { useEffect, useRef, useState } from "react";
import {
  CALENDAR_DATE_CONTAINER_HEIGHT_DEFAULT,
  CALENDAR_DAYS_ARRAY,
  CALENDAR_DEFAULT_HEIGHT,
  CALENDAR_DEFAULT_WIDTH,
  CALENDAR_INITIAL_RENDER_MONTH,
} from "../constants/AppConstant";
import DateLayout from "../layout/DateLayout";
import MonthHead from "../layout/MonthHead";
import "./../styles/main.css";
import {
  addMonthInDate,
  checkIsValidDate,
  compareDate,
  dateIsInBetween,
  getCurrentDate,
  getDisplayDateFormat,
  getMonthDifference,
  getNoOfDaysInMonth,
  isSameDate,
  subMonthInDate,
} from "../utils/DateUtils";
import { getDay } from "date-fns";

import { InfiniteScrollCalendarProps } from "./InfiniteScrollCalendar.types";

const InfiniteScrollCalendar = ({
  visibleDate = new Date(),
  isMultipleSelect = false,
  inifiniteScroll = true,
  handleDateSelect = () => {},
  selectedDates = [],
  disabledDates = [],
  renderMinDate,
  renderMaxDate,
  calendarHeight = CALENDAR_DEFAULT_HEIGHT,
  calendarWidth = CALENDAR_DEFAULT_WIDTH,
  calendarHeaderContainerClass = "",
  calendarDateContainerClass = "",
  calendarContainerClass = "",
}: InfiniteScrollCalendarProps) => {
  const renderMonth = CALENDAR_INITIAL_RENDER_MONTH;

  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [dateSelected, setDateSelected] =
    useState<Array<string>>(selectedDates);
  const [dateDisabled, setDateDisabled] =
    useState<Array<string>>(disabledDates);

  const [buildCalendarStartDate, setBuildCalendarStartDate] = useState<
    Array<string>
  >([]);

  const containerRef: React.Ref<HTMLDivElement> = useRef(null);
  const [scrollPositionIndex, setScrollPositionIndex] = useState<number>(0);
  const [isInitialScroll, setIsInitialScroll] = useState<Boolean>(false);

  useEffect(() => {
    handleCalendarBuildDate();
    handleIsSelectedDateIsValid();
    handleDisableddDateIsValid();
  }, []);

  const handleIsSelectedDateIsValid = () => {
    let updateDates: Array<string> = [];
    if (Array.isArray(selectedDates)) {
      selectedDates.map((obj: string) => {
        let d = new Date(obj);
        if (checkIsValidDate(d)) {
          updateDates.push(obj);
        }
      });
    }
    setDateSelected(updateDates);
  };

  const handleDisableddDateIsValid = () => {
    let updateDates: Array<string> = [];
    if (Array.isArray(disabledDates)) {
      disabledDates.map((obj: string) => {
        let d = new Date(obj);
        if (checkIsValidDate(d)) {
          updateDates.push(obj);
        }
      });
    }
    setDateDisabled(updateDates);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollTo();
    }, 200);
  }, [containerRef]);

  const getCalendarBuildDate = () => {
    const currentDate = getCurrentDate();

    let calendarBuildStartDate = currentDate;
    let calendarBuildEndDate = addMonthInDate(currentDate, renderMonth);

    /**
     * Initial Build calendar conditions
     * when we didnot receive any visible date, any minimum start and max build date
     */
    if (!visibleDate && !renderMinDate && !renderMaxDate) {
      return {
        start_date: subMonthInDate(currentDate, 1),
        end_date: addMonthInDate(currentDate, renderMonth),
      };
    }

    if (
      visibleDate &&
      checkIsValidDate(visibleDate) &&
      !renderMinDate &&
      !renderMaxDate
    ) {
      return {
        start_date: subMonthInDate(visibleDate, 1),
        end_date: addMonthInDate(visibleDate, renderMonth),
      };
    }

    let dateToVisible = visibleDate;
    if (renderMinDate && checkIsValidDate(renderMinDate)) {
      calendarBuildStartDate = subMonthInDate(renderMinDate, 1);
      if (!visibleDate) {
        dateToVisible = renderMinDate;
      }
    }

    if (renderMaxDate && checkIsValidDate(renderMaxDate)) {
      calendarBuildEndDate = addMonthInDate(renderMaxDate, renderMonth);
      if (!visibleDate) {
        dateToVisible = renderMaxDate;
      }
    }

    /**
     * if visible date is in between, calendar build start date and end date
     */

    if (visibleDate && renderMinDate && renderMaxDate) {
      let isInDateRange = dateIsInBetween(
        visibleDate,
        renderMinDate,
        renderMaxDate
      );
      if (isInDateRange) {
        let prevMonthFromCurrentMonth = getMonthDifference(
          calendarBuildStartDate,
          dateToVisible
        );

        calendarBuildStartDate = subMonthInDate(
          dateToVisible,
          prevMonthFromCurrentMonth
        );
      }
    }

    return {
      start_date: calendarBuildStartDate,
      end_date: calendarBuildEndDate,
    };
  };
  const handleCalendarBuildDate = () => {
    let buildDates = getCalendarBuildDate();

    let startDate: Date = buildDates.start_date;
    let endDate: Date = buildDates.end_date;
    let monthToRender = getMonthDifference(startDate, endDate);
    monthToRender = monthToRender <= 0 ? 2 : monthToRender + 1;

    setMonth(getDisplayDateFormat(startDate, "MMMM"));
    setYear(getDisplayDateFormat(startDate, "yyyy"));

    buildCalendarRenderArray(startDate, monthToRender);
  };

  const buildCalendarRenderArray = (startDate: Date, noOfElement: number) => {
    let buildArray = new Array(noOfElement).fill(Number).map((obj, i) => {
      return getDisplayDateFormat(
        addMonthInDate(new Date(startDate), i),
        "yyyy-MM-dd"
      );
    });

    setBuildCalendarStartDate(buildArray);
  };

  const renderHeader = () => {
    return (
      <div
        className={` infinity-calendar-header  ${calendarHeaderContainerClass}`}
      >
        <MonthHead displayMonth={month} displayYear={year} />
        <div className="days">
          {CALENDAR_DAYS_ARRAY.map((day: string) => {
            return <span className="day-title js-dayTitle">{day}</span>;
          })}
        </div>
      </div>
    );
  };

  const calendarScroll = (elem: any) => {
    let target = elem.target;
    let calendarScrollHeight = target.scrollHeight;

    let containerScrollTop = target.scrollTop;

    let positionIndex = scrollPositionIndex;

    let dividedBy = CALENDAR_DATE_CONTAINER_HEIGHT_DEFAULT - 10;
    let currentScrollPos = Math.floor(containerScrollTop / dividedBy);

    let getCurrentPosBaseOnBuildMonth = Math.floor(
      calendarScrollHeight / currentScrollPos
    );

    handleCalendarScroll(getCurrentPosBaseOnBuildMonth, containerScrollTop);

    let detailContainer = [
      ...target.querySelectorAll(".js-calendarSubContainer"),
    ];

    if (positionIndex !== currentScrollPos) {
      setScrollPositionIndex(currentScrollPos);
      let currentReport = detailContainer[currentScrollPos];
      let displayMonth = `${currentReport.getAttribute("data-month")} `;
      let displayYear = currentReport.getAttribute("data-year");
      setMonth(displayMonth);
      setYear(displayYear);
    }
  };

  const handleCalendarScroll = (
    getCurrentPosBaseOnBuildMonth: any,
    containerScrollTop: any
  ) => {
    if (inifiniteScroll) {
      if (getCurrentPosBaseOnBuildMonth <= 500) {
        addDateInBuildCalendar(true);
      }
      if (containerScrollTop <= 500 && isInitialScroll) {
        addDateInBuildCalendar(false);
      }
    }
  };

  const addDateInBuildCalendar = (
    addInlast = true,
    skipRenderMonth = false
  ) => {
    let prevCalendarDates = [...buildCalendarStartDate];

    if (prevCalendarDates.length > 0) {
      let lastItem = prevCalendarDates[prevCalendarDates.length - 1];
      let firstItem = prevCalendarDates[0];
      let monthToRender = renderMonth;

      if (addInlast) {
        let date = getDisplayDateFormat(new Date(lastItem!));
        for (let i = 1; i < renderMonth + 1; i++) {
          prevCalendarDates = [
            ...prevCalendarDates,
            ...[
              getDisplayDateFormat(
                addMonthInDate(new Date(date), i),
                "yyyy-MM-dd"
              ),
            ],
          ];
        }
        setBuildCalendarStartDate(prevCalendarDates);
      } else {
        let date = getDisplayDateFormat(new Date(firstItem));
        if (skipRenderMonth) {
          monthToRender = 3;
        }
        for (let i = 1; i < monthToRender + 1; i++) {
          let cc = getDisplayDateFormat(
            subMonthInDate(new Date(date), i),
            "yyyy-MM-dd"
          );
          prevCalendarDates = [...[cc], ...prevCalendarDates];
        }
        setBuildCalendarStartDate(prevCalendarDates);
      }
    }
  };

  const handleDateClick = (selectedDate: string, dateObj: Date) => {
    let prevSelectedDates = [...dateSelected];
    if (isMultipleSelect) {
      let isDateIncluded = prevSelectedDates.includes(selectedDate);
      if (isDateIncluded) {
        prevSelectedDates = prevSelectedDates.filter((d) => d !== selectedDate);
      } else {
        prevSelectedDates.push(selectedDate);
      }
      setDateSelected([...prevSelectedDates]);
      handleDateSelect([...prevSelectedDates]);
    } else {
      setDateSelected([selectedDate]);
      handleDateSelect([selectedDate]);
    }
  };

  const renderDateContainer = (date: string) => {
    let dateObj = new Date(date);
    let currentDate = new Date();

    let dateDisplayFormat = getDisplayDateFormat(dateObj);
    let noOfDays = getNoOfDaysInMonth(dateObj);
    let month = getDisplayDateFormat(dateObj, "MMMM");
    let year = getDisplayDateFormat(dateObj, "yyyy");

    const dates = Array(noOfDays)
      .fill(Number)
      .map((k, index) => index + 1);

    let firstDateToRender: Date;
    let lastDateToRender: Date;

    if (renderMinDate && checkIsValidDate(renderMinDate)) {
      // need to check validte dates
      firstDateToRender = renderMinDate;
    }
    if (renderMaxDate && checkIsValidDate(renderMaxDate)) {
      // need to check validte dates
      lastDateToRender = renderMaxDate;
    }
    return (
      <div
        key={dateDisplayFormat}
        className={`js-calendarSubContainer infinity-calendar-sub-container ${calendarDateContainerClass}`}
        data-month={month}
        data-year={year}
        data-date={dateDisplayFormat}
        style={{
          height: CALENDAR_DATE_CONTAINER_HEIGHT_DEFAULT,
          minHeight: CALENDAR_DATE_CONTAINER_HEIGHT_DEFAULT,
          maxHeight: CALENDAR_DATE_CONTAINER_HEIGHT_DEFAULT,
        }}
      >
        <div className="dates">
          {dates.map((d, index) => {
            let calDate = new Date(
              `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${d}`
            );

            let calDateInString = getDisplayDateFormat(calDate);
            let isCurrentDate = isSameDate(currentDate, calDate);

            let isDisabled = false;
            let firstDayStyle = {};
            let buildDateIsIn = true;

            if (calDate.getDate() === 1) {
              let day = getDay(calDate);
              firstDayStyle = {
                gridColumn: day === 0 ? 7 : day,
              };
            }
            if (firstDateToRender && lastDateToRender) {
              buildDateIsIn = dateIsInBetween(
                calDate,
                firstDateToRender,
                lastDateToRender
              );
            } else if (firstDateToRender) {
              buildDateIsIn = compareDate(firstDateToRender, calDate) <= 0;
            } else if (lastDateToRender) {
              buildDateIsIn = compareDate(lastDateToRender, calDate) >= 0;
            }

            if (!buildDateIsIn) {
              isDisabled = true;
            } else if (dateDisabled.includes(calDateInString)) {
              isDisabled = true;
            }

            return (
              <DateLayout
                key={`${calDateInString}-${index}`}
                dateObj={calDate}
                date={calDateInString}
                firstDayStyle={firstDayStyle}
                displayText={`${d}`}
                isCurrentDate={isCurrentDate}
                isDisabled={isDisabled}
                handleDaySelect={handleDateClick}
                isDateSelected={dateSelected.includes(calDateInString)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const getCalendarContainerHeight = () => {
    return calendarHeight - 10;
  };

  const getCalendarContainerWidth = () => {
    return calendarWidth;
  };

  const scrollTo = () => {
    let dateToVisible = new Date();

    if (visibleDate && checkIsValidDate(visibleDate)) {
      dateToVisible = visibleDate;
    } else {
      if (renderMinDate && checkIsValidDate(renderMinDate) && !renderMaxDate) {
        dateToVisible = renderMinDate;
      } else if (renderMaxDate && checkIsValidDate(renderMaxDate)) {
        dateToVisible = renderMaxDate;
      }
    }

    let dateInDisplayFormat = getDisplayDateFormat(dateToVisible);

    let containerSelector = containerRef?.current?.querySelector(
      `.js-dateContainer[data-date='${dateInDisplayFormat}']`
    ) as HTMLDivElement;

    if (containerSelector) {
      let positonY = containerSelector?.offsetTop!;
      positonY = positonY - (CALENDAR_DATE_CONTAINER_HEIGHT_DEFAULT - 100);
      containerRef?.current?.scrollTo({ top: positonY, behavior: "smooth" });
      setTimeout(() => {
        setIsInitialScroll(true);
      }, 1000);
    }
  };

  return (
    <div
      className={`infinity-calendar ${calendarContainerClass} `}
      style={{ height: calendarHeight, width: calendarWidth }}
    >
      {renderHeader()}
      <div
        ref={containerRef}
        className="infinity-calendar-day-container  "
        onScroll={calendarScroll}
        style={{
          maxHeight: getCalendarContainerHeight(),
          width: getCalendarContainerWidth(),
        }}
      >
        {buildCalendarStartDate.length > 0
          ? buildCalendarStartDate.map((date) => {
              return renderDateContainer(date);
            })
          : null}
      </div>
    </div>
  );
};

export default InfiniteScrollCalendar;
