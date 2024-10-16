import React, { createContext, useState, type PropsWithChildren } from "react";
import BottomCard from "@/components/BottomCard";
import { usePathname } from "expo-router";

const Context = createContext<{
    openCard: () => void,
    setElement: (element: React.ReactNode) => void,
}>({
    openCard: () => null,
    setElement: () => null,
});

const BottomCardProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<React.ReactNode>();
    const route = usePathname();

    React.useEffect(() => {
        setOpen(false);
    }, [route]);

    const openCard = () => {
        setOpen(true);
    }

    return (
        <Context.Provider value={{ openCard, setElement: setData }}>
            <BottomCard
                open={open}
                onClosed={() => setOpen(false)}
            >
                {data}
            </BottomCard>
            {children}
        </Context.Provider>
    );
}

export default BottomCardProvider;

export function useBottomCard() { return React.useContext(Context) };