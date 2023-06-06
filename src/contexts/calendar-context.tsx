import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { DragParams } from "../components/MainBlock";
import {
  calculateDays,
  calculateDroppedEvents,
  DayObject,
} from "../utils/calculateDays";

export interface EventData {
  title: string;
  description: string;
  date: string;
  eventId: string;
  colors: string[];
}
const DUMMY_EVENTS_DATA: EventData[] = [
  {
    title: "ev1",
    description: "desck1",
    date: "2023-06-06",
    eventId: Math.random().toFixed(10),
    colors: ["yellow", "red"],
  },
  {
    title: "ev2",
    description: "desck2",
    date: "2023-06-06",
    eventId: Math.random().toFixed(10),
    colors: ["yellow", "blue"],
  },
  {
    title: "ev3",
    description: "desck3",
    date: "2023-06-15",
    eventId: Math.random().toFixed(10),
    colors: ["yellow", "red"],
  },
  {
    title: "ev4",
    description: "desck4",
    date: "2023-06-15",
    eventId: Math.random().toFixed(10),
    colors: ["yellow", "black"],
  },
];

export enum LeftRightArrows {
  Right,
  Left,
}
export interface DaysData {
  days: DayObject[];
  curMonth: string;
}
interface InitialCalendarState {
  daysData: DaysData;
  goBackNextAction: (value: LeftRightArrows) => void;
  todayBtn: () => void;
  dragDropUpdate: (value: DragParams) => void;
}
const initialState: InitialCalendarState = {
  daysData: { days: [], curMonth: "" },
  goBackNextAction: () => {},
  todayBtn: () => {},
  dragDropUpdate: () => {},
};
export const CalendarContext = createContext(initialState);

type CalendarContextProviderProps = {
  children: ReactNode;
};
const CalendarContextProvider: FC<CalendarContextProviderProps> = ({
  children,
}) => {
  const [daysData, setDaysData] = useState<DaysData>({
    curMonth: "",
    days: [],
  });
  const [monthMark, setMonthMark] = useState<number>(0);
  useEffect(() => {
    const updatedDays = calculateDays(monthMark);
    updatedDays.days = updatedDays.days.map((day) => {
      const dayDate = new Date(day.year, day.monthIndex, day.date)
        .toLocaleDateString()
        .split(".")
        .reverse()
        .join("-");
      const subArray = DUMMY_EVENTS_DATA.filter(
        (data) => data.date === dayDate
      );
      day.events = subArray;
      return day;
    });
    setDaysData(updatedDays);
  }, [monthMark]);

  const goBackNextAction = (value: LeftRightArrows) => {
    if (value === LeftRightArrows.Right) {
      setMonthMark((value) => value + 1);
    } else if (value === LeftRightArrows.Left) {
      setMonthMark((value) => value - 1);
    }
  };
  const dragDropUpdate = (dragParams: DragParams) => {
    const dayEnd = daysData?.days[dragParams.dropDayIndex];
    if (
      dayEnd?.events.length === 3 &&
      dragParams.dragStartDayIndex !== dragParams.dropDayIndex
    ) {
      return;
    }
    const dayStart = daysData?.days[dragParams.dragStartDayIndex];
    const transitionedEvent = dayStart?.events.find(
      (event) => event.eventId === dragParams.eventId
    );
    if (!transitionedEvent || !daysData?.days) {
      return;
    }
    const updatedDaysData = daysData.days.map((day, index) => {
      if (index === dragParams.dragStartDayIndex) {
        day.events = day.events!.filter(
          (event) => event.eventId !== dragParams.eventId
        );
      }
      if (index === dragParams.dropDayIndex) {
        day.events = calculateDroppedEvents(
          day.events,
          transitionedEvent,
          dragParams.offsetY
        );
      }
      return day;
    });
    setDaysData((values) => ({
      ...values,
      days: updatedDaysData,
    }));
  };
  const value = {
    daysData,
    goBackNextAction,
    todayBtn: () => setMonthMark(0),
    dragDropUpdate,
  };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
export default CalendarContextProvider;
