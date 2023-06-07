import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export const Control = styled.div`
  margin: 15px 0;
  position: relative;
`;
export const Label = styled.label`
  display: block;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;
export const TextField = styled.input`
  display: block;
  font-size: 18px;
  width: 100%;
`;
export const Description = styled.textarea`
  display: block;
  font-size: 18px;
  width: 100%;
`;
export const ActionBtnsBox = styled.section`
  display: flex;
  justify-content: space-between;
`;
export const MainBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 20px;
  width: 100px;
  border: none;
  background-color: blue;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  &:active {
    opacity: 0.5;
  }
  &[disabled] {
    opacity: 0.5;
  }
  &[data-delete] {
    background-color: red;
  }
`;
export const ErrorText = styled.span`
  color: red;
  font-size: 16px;
  position: absolute;
  bottom: -20px;
`;
export const AddColorBtn = styled.button`
  width: 40px;
  height: 40px;
  font-size: 25px;
  font-weight: 600;
  border: none;
  border-radius: 50%;
  background-olor: gray;
  cursor: pointer;
  &:active {
    opacity: 0.5;
  }
`;
export const ColorPickerBlock = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const RemoveBtn = styled.button`
  height: 30px;
  color: white;
  font-size: 10px;
  border: none;
  border-radius: 50%;
  background-color: red;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;
