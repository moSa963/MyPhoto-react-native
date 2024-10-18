import React, { createContext, useState, type PropsWithChildren } from "react";
import BottomCard from "@/components/BottomCard";
import { usePathname } from "expo-router";

const Context = createContext<{
    openCard: (element: React.ReactNode) => void,
}>({
    openCard: () => null,
});

const BottomCardProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<React.ReactNode>(null);
    const route = usePathname();

    React.useEffect(() => {
        setOpen(false);
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