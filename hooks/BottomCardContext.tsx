import React, { createContext, useState, type PropsWithChildren } from "react";
import BottomCard from "@/components/BottomCard";
import { useFocusEffect, usePathname } from "expo-router";
import { BackHandler } from "react-native";

const Context = createContext<{
    openCard: (element: React.ReactNode) => void,
}>({
    openCard: () => null,
});

const BottomCardProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<React.ReactNode>(null);
    const route = usePathname();

    useFocusEffect(
        React.useCallback(() => {
            const goBack = () => {
                if (!open) {
                    return false;
                }

                handleClosed();
                return true;
            }

            BackHandler.addEventListener("hardwareBackPress", goBack);

            return () => BackHandler.removeEventListener("hardwareBackPress", goBack);
        }, [open])
    );

    React.useEffect(() => {
        handleClosed();
    }, [route]);

    const handleClosed = () => {
        setData(null);
        setOpen(false);
    }

    const openCard = (element: React.ReactNode) => {
        setData(element);
        setOpen(true);
    }

    return (
        <Context.Provider value={{ openCard }}>
            <BottomCard
                open={open}
                onClosed={handleClosed}
            >
                {data}
            </BottomCard>
            {children}
        </Context.Provider>
    );
}

export default BottomCardProvider;

export function useBottomCard() { return React.useContext(Context) };