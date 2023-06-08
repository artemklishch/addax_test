import {
  createContext,
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  createEvent,
  deleteEvent,
  getWorldHolidays,
  updateDragDropDiffDays,
  updateDragDropInOneDay,
  updateEvent,
} from "../api";
import { EventFormState } from "../components/EventForm/initForm";
import { DragParams } from "../components/MainBlock";
import {
  calculateDroppedEvents,
  calculateFullData,
  DayObject,
  toLocalDateStrRev,
} from "../utils/calculateDays";

export interface EventData {
  title: string;
  description: string;
  date: string;
  eventId: string;
  colors: string;
  orderNumber: number;
}
export enum LeftRightArrows {
  Right,
  Left,
}
export interface DaysData {
  days: DayObject[];
  curMonth: string;
}
export interface PreparedValues {
  title: string;
  description: string;
  colors: string;
}
export interface WorldHoliday {
  counties: string[];
  countryCode: string;
  date: string;
  fixed: boolean;
  global: boolean;
  launchYear: any;
  localName: string;
  name: string;
  types: string[];
}
interface InitialCalendarState {
  daysData: DaysData;
  goBackNextAction: (value: LeftRightArrows) => void;
  todayBtn: () => void;
  dragDropUpdate: (value: DragParams) => void;
  openEventForm: (val: any) => void;
  closeEventForm: () => void;
  isEventFormOpen: boolean;
  editedEvent: EventData | null;
  onSaveEvent: (values: EventFormState) => void;
  onDeleteEvent: () => void;
}
const initialState: InitialCalendarState = {
  daysData: { days: [], curMonth: "" },
  goBackNextAction: () => {},
  todayBtn: () => {},
  dragDropUpdate: () => {},
  openEventForm: () => {},
  closeEventForm: () => {},
  isEventFormOpen: false,
  editedEvent: null,
  onSaveEvent: () => {},
  onDeleteEvent: () => {},
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
  const [isEventFormOpen, setIsEventFormOpen] = useState<boolean>(false);
  const [editedEvent, setEditedEvent] = useState<EventData | null>(null);
  const [choosenDayIndex, setChoosenDayIndex] = useState<number | null>(null);
  const [worldHolidays, setWorldHolidays] = useState([]);
  useEffect(() => {
    const fetchWorldHolidays = async () => {
      const data = await getWorldHolidays();
      setWorldHolidays(data);
    };
    fetchWorldHolidays();
  }, []);
  useEffect(() => {
    calculateFullData(monthMark, setDaysData, worldHolidays);
  }, [monthMark, worldHolidays]);

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
    const dayEndDate = toLocalDateStrRev(
      dayEnd.year,
      dayEnd.monthIndex,
      dayEnd.date
    );
    const dayStart = daysData?.days[dragParams.dragStartDayIndex];
    const transitionedEvent = dayStart?.events.find(
      (event) => event.eventId === dragParams.eventId
    );
    if (!transitionedEvent || !daysData?.days) {
      return;
    }
    let updatedDragedEvents: EventData[] = [];
    let updatedDropedEvents: EventData[] = [];
    const updatedDaysData = daysData.days.map((day, index) => {
      if (index === dragParams.dragStartDayIndex) {
        updatedDragedEvents = day
          .events!.filter((event) => event.eventId !== dragParams.eventId)
          .map((event, index) => ({ ...event, orderNumber: index }));
        day.events = updatedDragedEvents;
      }
      if (index === dragParams.dropDayIndex) {
        transitionedEvent.date = dayEndDate;
        updatedDropedEvents = calculateDroppedEvents(
          day.events,
          transitionedEvent,
          dragParams.offsetY
        ).map((event, index) => ({ ...event, orderNumber: index }));
        day.events = updatedDropedEvents;
      }
      return day;
    });
    setDaysData((values) => ({
      ...values,
      days: updatedDaysData,
    }));
    if (updatedDragedEvents[0]?.date === updatedDropedEvents[0].date) {
      updateDragDropInOneDay(updatedDropedEvents);
    } else {
      updateDragDropDiffDays({
        draggedDay: updatedDragedEvents,
        droppedDay: updatedDropedEvents,
      });
    }
  };

  const openEventForm = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const choosenDayInd = Number(targetElement.dataset.indexvalue);
    if (Number.isNaN(choosenDayInd)) {
      return;
    }
    if (
      !targetElement.dataset.event &&
      daysData.days[choosenDayInd].events.length === 3
    ) {
      return;
    } else if (targetElement.dataset.event) {
      const eventId = targetElement.id;
      const editedEvent = daysData.days[choosenDayInd].events.find(
        (event) => event.eventId === eventId
      );
      if (editedEvent) {
        setEditedEvent(editedEvent);
        setIsEventFormOpen(true);
        setChoosenDayIndex(choosenDayInd);
      }
    } else {
      setIsEventFormOpen(true);
      setChoosenDayIndex(choosenDayInd);
    }
  };
  const closeEventForm = () => {
    setIsEventFormOpen(false);
    setEditedEvent(null);
    setChoosenDayIndex(null);
  };
  const onSaveEvent = async (values: EventFormState) => {
    if (choosenDayIndex === null) {
      return;
    }
    const preparedValues: PreparedValues = {
      title: values.title.trim(),
      description: values.description.trim(),
      colors: values.colors.join(","),
    };
    if (!editedEvent) {
      const dayEvent = daysData.days[choosenDayIndex];
      if (dayEvent.events.length === 3) {
        return;
      }
      const eventDate = toLocalDateStrRev(
        dayEvent.year,
        dayEvent.monthIndex,
        dayEvent.date
      );
      const newEvent = await createEvent(preparedValues, eventDate);
      if (newEvent) {
        const updatedDaysData = { ...daysData };
        updatedDaysData.days[choosenDayIndex].events.push(newEvent);
        setDaysData(updatedDaysData);
      }
    } else {
      const updatedEvent = {
        ...editedEvent,
        ...preparedValues,
      };
      const isSuccess = await updateEvent(updatedEvent);
      if (isSuccess) {
        const updatedDaysData = { ...daysData };
        updatedDaysData.days[choosenDayIndex].events = updatedDaysData.days[
          choosenDayIndex
        ].events.map((event) => {
          if (event.eventId === updatedEvent.eventId) {
            return updatedEvent;
          }
          return event;
        });
        setDaysData(updatedDaysData);
      }
    }
    closeEventForm();
  };
  const onDeleteEvent = async () => {
    if (editedEvent) {
      const isSuccess = await deleteEvent(
        editedEvent.eventId,
        editedEvent.date
      );
      if (isSuccess && choosenDayIndex) {
        const updatedDaysData = { ...daysData };
        const updatedDay = daysData.days[choosenDayIndex];
        updatedDay.events = updatedDay.events
          .filter((event) => event.eventId !== editedEvent.eventId)
          .map((event, index) => ({ ...event, orderNumber: index }));
        setDaysData(updatedDaysData);
        closeEventForm();
      }
    }
  };
  const value = {
    daysData,
    goBackNextAction,
    todayBtn: () => setMonthMark(0),
    dragDropUpdate,
    openEventForm,
    closeEventForm,
    isEventFormOpen,
    editedEvent,
    onSaveEvent,
    onDeleteEvent,
  };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
export default CalendarContextProvider;
