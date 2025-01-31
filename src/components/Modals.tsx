import React from "react";
import Modal from "./UI/Modal/Modal";
import ModalStore from "../stores/modal-store";
import { observer } from "mobx-react-lite";
import { EditingModal } from "./Account/components/EditingModal";
import { AccountAvatarModal } from "./Account/components/AccountAvatarModal";
import { ProfileAvatarModal } from "./Profile/components/ProfileAvatarModal";

const Modals: React.FC = observer(() => {
    const { isEditingModalActive, isAccountAvatarModalActive, isProfileAvatarModalActive } = ModalStore

    return (
        <Modal>
            {isEditingModalActive && <EditingModal />}
            {isAccountAvatarModalActive && <AccountAvatarModal />}
            {isProfileAvatarModalActive && <ProfileAvatarModal />}
        </Modal>
    )
})



export default Modals