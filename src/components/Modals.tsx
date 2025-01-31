import React from "react";
import Modal from "./UI/Modal/Modal";
import ModalStore from "../stores/modal-store";
import { observer } from "mobx-react-lite";
import { EditingModal } from "./Account/components/EditingModal";
import { AvatarModal } from "./Account/components/AvatarModal";

const Modals: React.FC = observer(() => {
    const { isEditingModalActive, isAvatarModalActive } = ModalStore

    return (
        <Modal>
            {isEditingModalActive && <EditingModal />}
            {isAvatarModalActive && <AvatarModal />}
        </Modal>
    )
})



export default Modals