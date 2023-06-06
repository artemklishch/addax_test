import styled from "styled-components";

export const HeaderBox = styled.header`
  padding: 10px 20px;
  background-color: #f2f4f5;
`;

export const TopHeaderContainer = styled.section`
  display: flex;
`;
export const ArrowsBtnsBox = styled.div`
  display: flex;
`;
export const ArrowButton = styled.button`
  display: inline-block;
  margin: 5px;
  border: none;
  border-radius: 10px;
  background-color: #cfd3d4;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    opacity: 0.5;
  }
`;
export const ImgIcon = styled.img`
  width: 60%;
`;
export const TodayButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 30px;
  border: none;
  border-radius: 10px;
  background-color: #cfd3d4;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  &:active {
    opacity: 0.5;
  }
`;
export const CentralTopHeaderBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
`;

export const BottomHeaderContainer = styled.section`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const WeekDayBox = styled.div``;
