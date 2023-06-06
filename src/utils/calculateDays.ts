import { DaysData, EventData } from "../contexts/calendar-context";
import { EVENT_BLOCK_HEIGHT, MONTH_NAMES } from "./constants";

export interface DayObject {
  date: number;
  monthName: string;
  monthIndex: number;
  year: number;
  isCurMonth: boolean;
  events: EventData[];
}
type CalculateDays = (monthMark: number) => DaysData;
export const calculateDays: CalculateDays = (monthMark) => {
  const today: Date = new Date();
  today.setMonth(today.getMonth() + monthMark);
  const todayDateArrVaues = today.toDateString().split(" ");
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const firstDateInMonth = new Date(thisYear, thisMonth, 1);
  const lastDayInMonth = new Date(thisYear, thisMonth + 1, 0);
  const firstDayIndex = firstDateInMonth.getDay();
  const firstWeekDate = new Date(
    firstDateInMonth.setDate(firstDateInMonth.getDate() - firstDayIndex)
  );
  let daysNumToRender = firstDayIndex + lastDayInMonth.getDate();
  if (daysNumToRender % 7 !== 0) {
    do {
      daysNumToRender++;
    } while (daysNumToRender % 7 !== 0);
  }
  let daysArray: DayObject[] = [];
  for (let i = 0; i < daysNumToRender; i++) {
    const dayString = firstWeekDate.toDateString().split(" ");
    const dayData: DayObject = {
      date: +dayString[2],
      monthName: dayString[1],
      monthIndex: firstWeekDate.getMonth(),
      year: +dayString[3],
      isCurMonth: todayDateArrVaues[1] === dayString[1],
      events: [],
    };
    daysArray.push(dayData);
    firstWeekDate.setDate(firstWeekDate.getDate() + 1);
  }
  return {
    days: daysArray,
    curMonth: `${MONTH_NAMES[thisMonth]} ${thisYear}`,
  };
};

type CalculateDroppedEvents = (
  events: EventData[],
  newEvent: EventData,
  offsetY: number
) => EventData[];
export const calculateDroppedEvents: CalculateDroppedEvents = (
  events,
  newEvent,
  offsetY
): EventData[] => {
  const updatedEvents = [...events];
  if (!updatedEvents.length) {
    updatedEvents.push(newEvent);
  } else {
    const newEventIndex =
      offsetY <= EVENT_BLOCK_HEIGHT
        ? 0
        : offsetY > EVENT_BLOCK_HEIGHT && offsetY <= EVENT_BLOCK_HEIGHT * 2
        ? 1
        : 2;
    updatedEvents.splice(newEventIndex, 0, newEvent);
  }
  return updatedEvents;
};
