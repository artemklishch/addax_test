import styled from "styled-components";

export const DayBlockBox = styled.div`
  height: 150px;
  width: calc(100% / 7);
  border: 2px solid #fff;
  background-color: #e8eced;
  padding: 5px;
  cursor: pointer;
  &[data-evenmonth="true"] {
    background-color: #ebf5f7;
  }
`;
export const TopRow = styled.p`
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;
export const TopRowSpan = styled.span`
  font-size: 16px;
  display: inline-block;
  margin-right: 10px;
`;
export const EventBox = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
  height: 30px;
`;
export const EventBoxHeader = styled.h5`
  margin: 0;
  font-size: 16px;
`;
export const CommonDayData = styled.div`
  flex-grow: 1;
`;
export const HolydayData = styled.div`
  padding: 0 10px;
  background-color: red;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  text-align: center;
  svg {
    fill: white;
    height: 60%;
  }
  &:active {
    opacity: 0.5;
  }
`;
