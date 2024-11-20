# react-infinite-scroll-calendar
An Infinite Scroll calendar in react and typescript. React js Infinite scrolling date-picker, with multiple select, single select, inifinte scrolling, min and max date, and more..

## Features

- **Infinite scroll** – Just keep scrollin', just keep scrollin'
- **Typescript Support**
- **Flexible** – Min/max date, disabled dates, selected dates, etc.
- **Extensible** – Multiple date selection, Single Date Selection
- **Customizeable** – Customize Css according to your theme.
- **Mobile-friendly** – Silky smooth scrolling on mobile

## Getting Started

## Installation

```bash
npm install @anvikjs/react-infinite-scroll-calendar
```

## Usage

**_Step 1_**

```sh
npm install @anvikjs/react-infinite-scroll-calendar
```

**_Step 2_**

```sh
import InfiniteScrollCalendar from "@anvikjs/react-infinite-scroll-calendar";

```

**_Step 3_**

```sh
    <InfiniteScrollCalendar
        calendarHeight={600}
        calendarWidth={500}
         renderMinDate={new Date(2022, 0, 1)}
        renderMaxDate={new Date(2022, 11, 31)}
        inifinityScroll={true}
        isMultipleSelect={true}
        selectedDates={["19-11-2024"]}
        handleDateSelect={(date) => {
            console.log(date);
        }}
        disabledDates={["18-11-2024"]}
    />
```

## Prop Types

| Property                     | Type     | Default | Description                                                                                                              |
| :--------------------------- | :------- | :------ | :----------------------------------------------------------------------------------------------------------------------- |
| calendarWidth                | Number   | `450`   | Width of the calendar, in pixels                                                                                         |
| calendarHeight               | Number   | `600`   | Height of the calendar, in pixels                                                                                        |
| renderMinDate                | Date     |         | The minimum month that can be scrolled to, If inifinite scroll is true, then its disabled all dates before renderMinDate |
| renderMaxDate                | Date     |         | The maximum date that can be scrolled to, If inifinite scroll is true, then its disabled all dates after renderMaxDate   |
| visibleDate                  | Date     |         | The date is to be visible when calendar initinal render                                                                  |
| inifinityScroll              | Bool     | true    | Allow calendar to scroll inifinte times.                                                                                 |
| isMultipleSelect             | Bool     | false   | Allow to select multiple dates                                                                                           |
| disabledDates                | Array    | []      | Array of dates that should be disabled. For example: `["18-11-2024"]`                                                    |
| selectedDates                | Array    | []      | Array of dates that should be selected. for example ["19-11-2024"]                                                       |
| handleDateSelect             | Function |         | Callback invoked after date is selected.                                                                                 |
| calendarContainerClass       | String   | ''      | Class thats add to the main container of Calendar.                                                                       |
| calendarHeaderContainerClass | String   | ''      | Class thats add to ther header container of Calendar.                                                                    |
| calendarDateContainerClass   | String   | ''      | Class thats add to the date container of Calendar                                                                        |

## Reporting Issues

If you find an [issue](https://github.com/anvikjs/react-infinite-scroll-calendar/issues), please report it along with any relevant details to reproduce it. Its is a great help to improving the packages

## Future Release

- **Date Range Selection**
- **Horizontal Scroll**
- **Customized Month To Render**

## Dependencies

React Infinite Calendar has very few dependencies. It relies on [`date-fns`](https://www.npmjs.com/package/date-fns). It also has the following peerDependencies: [`react`](https://www.npmjs.com/package/react).

## Author

[**Kawal Jain**]

## License

_@anvikjs/react-infinite-scroll-calendar_ is available under the [MIT](https://choosealicense.com/licenses/mit/) License.
