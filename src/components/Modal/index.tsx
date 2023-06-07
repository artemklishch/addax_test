import ReactDOM from "react-dom";
import { FC, MouseEvent, ReactNode } from "react";
import {
  CrossIcon,
  ModalPopup,
  ModalPopupWrap,
  ModalWrapper,
} from "./Modal.styles";
import CloseIcon from "../../assets/cross_icon.svg";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};
const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const onCloseHandler = (event: MouseEvent) => {
    if ((event.target as HTMLDivElement).dataset.overlay) {
      onClose();
    }
  };
  const modalWrapper = (
    <ModalWrapper data-overlay onClick={onCloseHandler}>
      <ModalPopup>
        <CrossIcon src={CloseIcon} alt="Croos icon" onClick={onClose} />
        <ModalPopupWrap>{children}</ModalPopupWrap>
      </ModalPopup>
    </ModalWrapper>
  );
  return ReactDOM.createPortal(modalWrapper, document.body);
};

export default Modal;
