import React from "react";
import { MonthHeadProps } from "../component/InfiniteScrollCalendar.types";

export default function MonthHead({
  displayMonth,
  displayYear,
}: MonthHeadProps) {
  return (
    <div className="month">
      <div>
        {displayMonth}
        <span className="year">{displayYear}</span>
      </div>
    </div>
  );
}
