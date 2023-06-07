import { DragEvent, FC, useContext, useRef } from "react";
import { CalendarContext } from "../../contexts/calendar-context";
import { EVENT_BLOCK_HEIGHT } from "../../utils/constants";
import EventForm from "../EventForm";
import DayBlock from "./DayBlock";
import { MainBlockContainer } from "./MainBlock.styles";

export interface DragParams {
  eventId: string;
  dragStartDayIndex: number;
  dropDayIndex: number;
  offsetY: number;
}
const MainBlock: FC = () => {
  const calendarCtx = useContext(CalendarContext);
  const daysMainBlockRef = useRef<HTMLElement>(null);
  const dragParams = useRef<DragParams>();
  const dragStartHandler = (event: DragEvent) => {
    dragParams.current = {
      eventId: (event.target as HTMLDivElement).id,
      dragStartDayIndex: +(event.target as HTMLDivElement).dataset.indexvalue!,
      dropDayIndex: +(event.target as HTMLDivElement).dataset.indexvalue!,
      offsetY: 0,
    };
  };
  const dropHandler = (event: DragEvent) => {
    event.preventDefault();
    if (
      dragParams.current?.eventId &&
      !Number.isNaN(dragParams.current.dragStartDayIndex) &&
      !Number.isNaN(dragParams.current.dropDayIndex)
    ) {
      const droppedDay = (daysMainBlockRef.current as HTMLElement).children[
        dragParams.current.dropDayIndex
      ];
      const offsetY =
        event.clientY -
        droppedDay.getBoundingClientRect().top -
        EVENT_BLOCK_HEIGHT;
      dragParams.current.offsetY = offsetY;
      calendarCtx.dragDropUpdate(dragParams.current);
    }
  };
  const dragOver = (event: DragEvent) => event.preventDefault();
  const dragEnterHandler = (event: DragEvent) => {
    const targetElem = event.target as HTMLDivElement;
    const indexValue = +targetElem.dataset.indexvalue!;
    if (indexValue && dragParams.current) {
      dragParams.current.dropDayIndex = indexValue;
    }
  };
  return (
    <MainBlockContainer ref={daysMainBlockRef}>
      {calendarCtx.isEventFormOpen && (
        <EventForm onClose={calendarCtx.closeEventForm} />
      )}
      {calendarCtx.daysData.days.map((dayData, index, array) => {
        return (
          <DayBlock
            key={index}
            dayData={dayData}
            allDaysData={array}
            index={index}
            dropHandler={dropHandler}
            dragOver={dragOver}
            dragEnterHandler={dragEnterHandler}
            openEventForm={calendarCtx.openEventForm}
            dragStartHandler={dragStartHandler}
          />
        );
      })}
    </MainBlockContainer>
  );
};

export default MainBlock;
