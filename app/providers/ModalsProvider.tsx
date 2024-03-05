import { useDisclosure } from "@mantine/hooks";
import { createContext, useContext } from "react";

type IModalsState = {
    isOpenStoreModal: boolean;
    onOpenStoreModal: () => void;
    onCloseStoreModal: () => void;
    isOpenDeleteStoreModal: boolean;
    onOpenDeleteStoreModal: () => void;
    onCloseDeleteStoreModal: () => void;
    isOpenDeleteBillboardModal: boolean;
    onOpenDeleteBillboardModal: () => void;
    onCloseDeleteBillboardModal: () => void;
};

const ModalContext = createContext<IModalsState>({
    isOpenStoreModal: false,
    onOpenStoreModal: () => {},
    onCloseStoreModal: () => {},
    isOpenDeleteStoreModal: false,
    onOpenDeleteStoreModal: () => {},
    onCloseDeleteStoreModal: () => {},
    isOpenDeleteBillboardModal: false,
    onOpenDeleteBillboardModal: () => {},
    onCloseDeleteBillboardModal: () => {},
});

const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
    const [
        isOpenStoreModal,
        { open: onOpenStoreModal, close: onCloseStoreModal },
    ] = useDisclosure(false);

    const [
        isOpenDeleteStoreModal,
        { open: onOpenDeleteStoreModal, close: onCloseDeleteStoreModal },
    ] = useDisclosure(false);

    const [
        isOpenDeleteBillboardModal,
        {
            open: onOpenDeleteBillboardModal,
            close: onCloseDeleteBillboardModal,
        },
    ] = useDisclosure(false);

    const value: IModalsState = {
        isOpenStoreModal,
        onOpenStoreModal,
        onCloseStoreModal,
        isOpenDeleteStoreModal,
        onOpenDeleteStoreModal,
        onCloseDeleteStoreModal,
        isOpenDeleteBillboardModal,
        onOpenDeleteBillboardModal,
        onCloseDeleteBillboardModal,
    };
    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
};

export const useModalsContext = () => {
    return useContext(ModalContext);
};

export default ModalsProvider;
