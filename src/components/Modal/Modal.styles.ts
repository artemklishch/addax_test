import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalPopup = styled.main`
  width: 80%;
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  position: relative;
`;
export const ModalPopupWrap = styled.div`
  margin-top: 20px;
`;
export const CrossIcon = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
