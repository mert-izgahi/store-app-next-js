import { useDisclosure } from "@mantine/hooks";
import { createContext, useContext } from "react";

type IModalsState = {
    isOpenStoreModal: boolean;
    onOpenStoreModal: () => void;
    onCloseStoreModal: () => void;
    isOpenDeleteStoreModal: boolean;
    onOpenDeleteStoreModal: () => void;
    onCloseDeleteStoreModal: () => void;
};

const ModalContext = createContext<IModalsState>({
    isOpenStoreModal: false,
    onOpenStoreModal: () => {},
    onCloseStoreModal: () => {},
    isOpenDeleteStoreModal: false,
    onOpenDeleteStoreModal: () => {},
    onCloseDeleteStoreModal: () => {},
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
    const value: IModalsState = {
        isOpenStoreModal,
        onOpenStoreModal,
        onCloseStoreModal,
        isOpenDeleteStoreModal,
        onOpenDeleteStoreModal,
        onCloseDeleteStoreModal,
    };
    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
};

export const useModalsContext = () => {
    return useContext(ModalContext);
};

export default ModalsProvider;
