import React, { createContext, useState, type PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import BottomCard from "@/components/BottomCard";

export type BottomCardStateProps = { children?: React.ReactNode, footer?: React.ReactElement };

const Context = createContext<{
    openCard: () => void,
    setElement: (elements: BottomCardStateProps) => void,
}>({
    openCard: () => null,
    setElement: () => null,
});

const BottomCardProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<BottomCardStateProps>({});

    const openCard = () => {
        setOpen(true);
    }

    return (
        <Context.Provider value={{ openCard, setElement: setData }}>
            <BottomCard
                open={open}
                footer={data.footer}
                onClosed={() => setOpen(false)}
            >
                {data.children}
            </BottomCard>
            {children}
        </Context.Provider>
    );
}

export default BottomCardProvider;

export function useBottomCard() { return React.useContext(Context) };