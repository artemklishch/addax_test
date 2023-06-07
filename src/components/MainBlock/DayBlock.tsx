import { FC, DragEvent, MouseEvent, useState } from "react";
import { DayObject } from "../../utils/calculateDays";
import {
  DayBlockBox,
  TopRow,
  TopRowSpan,
  EventBox,
  EventBoxHeader,
  CommonDayData,
  HolydayData,
} from "./DayBlock.styles";
import { ReactComponent as GlassesIcon } from "../../assets/glasses_icon.svg";
import HolydaysDataModal from "../HolydaysData";

type DayBlockProps = {
  dayData: DayObject;
  allDaysData: DayObject[];
  index: number;
  dropHandler: (event: DragEvent) => void;
  dragOver: (event: DragEvent) => void;
  dragEnterHandler: (event: DragEvent) => void;
  dragStartHandler: (event: DragEvent) => void;
  openEventForm: (event: MouseEvent) => void;
};

const DayBlock: FC<DayBlockProps> = ({
  dayData,
  allDaysData,
  index,
  dragEnterHandler,
  dropHandler,
  dragOver,
  dragStartHandler,
  openEventForm,
}) => {
  const [isHolidaysModal, setIsHolidaysModal] = useState<boolean>(false);
  const isEvenMonth = dayData.monthIndex % 2 === 0;
  const isFirstLastDate =
    (allDaysData[index + 1] && allDaysData[index + 1].date === 1) ||
    dayData.date === 1;
  const topRowDateValue = isFirstLastDate
    ? `${dayData.monthName} ${dayData.date}`
    : dayData.date;
  const openHolidaysModal = () => setIsHolidaysModal(true);
  return (
    <>
      {dayData.isHoliday && isHolidaysModal && (
        <HolydaysDataModal
          holidays={dayData.isHoliday}
          onClose={() => setIsHolidaysModal(false)}
        />
      )}
      <DayBlockBox
        data-indexvalue={index}
        data-evenmonth={isEvenMonth}
        onDrop={dropHandler}
        onDragOver={dragOver}
        onDragEnter={dragEnterHandler}
        onClick={openEventForm}
      >
        <TopRow data-indexvalue={index}>
          <CommonDayData>
            <TopRowSpan data-indexvalue={index}>{topRowDateValue}</TopRowSpan>
            <TopRowSpan data-indexvalue={index}>
              {dayData.events.length !== 0 && `${dayData.events.length} cards`}
            </TopRowSpan>
          </CommonDayData>
          {dayData.isHoliday && (
            <HolydayData onClick={openHolidaysModal}>
              <GlassesIcon />
            </HolydayData>
          )}
        </TopRow>
        {dayData.events.length !== 0 &&
          dayData.events.map((data) => (
            <EventBox
              key={data.eventId}
              id={data.eventId}
              data-indexvalue={index}
              draggable="true"
              onDragStart={dragStartHandler}
              data-event
            >
              <EventBoxHeader
                data-event
                id={data.eventId}
                data-indexvalue={index}
              >
                {data.title}
              </EventBoxHeader>
            </EventBox>
          ))}
      </DayBlockBox>
    </>
  );
};

export default DayBlock;
