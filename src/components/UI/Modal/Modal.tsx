import React from "react";
import s from "./Modal.module.css";
import { observer } from "mobx-react-lite";
import ModalStore from "../../../stores/modal-store";

interface Props {
    children: React.ReactNode;
}

const Modal: React.FC<Props> = observer(({ children }) => {
    const { closeModals } = ModalStore;

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={s.background} onClick={closeModals}>
            <div className={s.container} onClick={handleContainerClick}>
                {children}
            </div>
        </div>
    );
});

export default Modal;