import { FC } from "react";
import { WorldHoliday } from "../../contexts/calendar-context";
import Modal from "../Modal";
import { HolidaysList, ListItem, Title } from "./HolydaysDataModal.styles";

type HolydaysDataProps = {
  onClose: () => void;
  holidays: WorldHoliday[];
};

const HolydaysDataModal: FC<HolydaysDataProps> = ({ onClose, holidays }) => {
  return (
    <Modal onClose={onClose}>
      <Title>There are next holidays today:</Title>
      <HolidaysList>
        {holidays.map((holiday, index) => (
          <ListItem key={index}>{holiday.name}</ListItem>
        ))}
      </HolidaysList>
    </Modal>
  );
};

export default HolydaysDataModal;
