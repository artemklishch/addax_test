import { DragEvent, FC, useContext, useRef } from "react";
import { CalendarContext } from "../../contexts/calendar-context";
import { EVENT_BLOCK_HEIGHT } from "../../utils/constants";
import {
  MainBlockContainer,
  DayBlockBox,
  TopRow,
  TopRowSpan,
  EventBox,
  EventBoxHeader,
} from "./MainBlock.styles";

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
      {calendarCtx.daysData.days.map((dayData, index, array) => {
        const isEvenMonth = dayData.monthIndex % 2 === 0;
        const isFirstLastDate =
          (array[index + 1] && array[index + 1].date === 1) ||
          dayData.date === 1;
        const topRowDateValue = isFirstLastDate
          ? `${dayData.monthName} ${dayData.date}`
          : dayData.date;
        return (
          <DayBlockBox
            key={index}
            data-indexvalue={index}
            data-evenmonth={isEvenMonth}
            onDrop={dropHandler}
            onDragOver={dragOver}
            onDragEnter={dragEnterHandler}
          >
            <TopRow>
              <TopRowSpan>{topRowDateValue}</TopRowSpan>
              <TopRowSpan>
                {dayData.events.length !== 0 &&
                  `${dayData.events.length} cards`}
              </TopRowSpan>
            </TopRow>
            {dayData.events.length !== 0 &&
              dayData.events.map((data) => (
                <EventBox
                  key={data.eventId}
                  id={data.eventId}
                  data-indexvalue={index}
                  draggable="true"
                  onDragStart={dragStartHandler}
                >
                  <EventBoxHeader>{data.title}</EventBoxHeader>
                </EventBox>
              ))}
          </DayBlockBox>
        );
      })}
    </MainBlockContainer>
  );
};

export default MainBlock;
