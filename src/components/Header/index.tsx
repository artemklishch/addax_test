import {
  HeaderBox,
  TopHeaderContainer,
  ArrowsBtnsBox,
  ArrowButton,
  TodayButton,
  CentralTopHeaderBox,
  BottomHeaderContainer,
  WeekDayBox,
  ImgIcon,
} from "./Header.styles";
import ArrowLeft from "../../assets/arrow_left.svg";
import ArrowRight from "../../assets/arrow_right.svg";
import { DAYS_NAMES } from "../../utils/constants";
import { FC, MouseEvent, useContext } from "react";
import {
  CalendarContext,
  LeftRightArrows,
} from "../../contexts/calendar-context";

const Header: FC = () => {
  const calendarCtx = useContext(CalendarContext);
  const onArrowHandler = (event: MouseEvent) => {
    const arrowBtnDataset = (event.target as HTMLButtonElement).dataset;
    if (arrowBtnDataset.arrow) {
      calendarCtx.goBackNextAction(+arrowBtnDataset.arrow);
    }
  };
  return (
    <HeaderBox>
      <TopHeaderContainer>
        <ArrowsBtnsBox>
          <ArrowButton
            data-arrow={LeftRightArrows.Left}
            onClick={onArrowHandler}
          >
            <ImgIcon src={ArrowLeft} data-arrow={LeftRightArrows.Left} />
          </ArrowButton>
          <ArrowButton
            data-arrow={LeftRightArrows.Right}
            onClick={onArrowHandler}
          >
            <ImgIcon src={ArrowRight} data-arrow={LeftRightArrows.Right} />
          </ArrowButton>
        </ArrowsBtnsBox>
        <CentralTopHeaderBox>
          {calendarCtx.daysData.curMonth}
        </CentralTopHeaderBox>
        <TodayButton onClick={calendarCtx.todayBtn}>Today</TodayButton>
      </TopHeaderContainer>

      <BottomHeaderContainer>
        {DAYS_NAMES.map((name) => (
          <WeekDayBox key={name}>{name}</WeekDayBox>
        ))}
      </BottomHeaderContainer>
    </HeaderBox>
  );
};

export default Header;
