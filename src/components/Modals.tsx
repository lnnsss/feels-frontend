import React from "react";
import Modal from "./UI/Modal/Modal";
import ModalStore from "../stores/modal-store";
import { observer } from "mobx-react-lite";
import { EditingModal } from "./Account/components/EditingModal";

const Modals: React.FC = observer(() => {
    const { isEditingModalActive } = ModalStore

    return (
        <Modal>
            {isEditingModalActive && <EditingModal />}
        </Modal>
    )
})



export default Modals