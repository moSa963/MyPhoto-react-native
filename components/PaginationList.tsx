import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { useRequest, Request } from '@/hooks/RequestContext';
import ThemedRefreshControl from "@/components/ThemedRefreshControl";

export type PaginationListProps<T> = Omit<FlatListProps<T>, "data" | "refreshing"> & { url: string, onRefresh?: () => void }

const PaginationList = ({ url, onScroll, ListHeaderComponent, onRefresh, style, ...rest }: PaginationListProps<any>) => {
    const [processing, setProcessing] = React.useState(false);
    const [list, setList] = React.useState([])
    const [next, setNext] = React.useState<string | null>(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const { theme } = useTheme();
    const request = useRequest();

    React.useEffect(() => {
        loadData(request, url, setList, setNext, setRefreshing);
    }, [request]);

    const handleRefresh = () => {
        loadData(request, url, setList, setNext, setRefreshing);
        onRefresh && onRefresh();
    }

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!processing && e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            loadNext(request, next, setList, setNext, setProcessing);
        }

        onScroll && onScroll(e);
    }

    return (
        <FlatList {...rest}
            style={[styles.root, style]}
            refreshControl={<ThemedRefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
            onScroll={handleScroll}
            refreshing={refreshing}
            ListFooterComponent={next !== null ? <ActivityIndicator color={theme.colors.text} size="large" /> : null}
            showsVerticalScrollIndicator={false}
            data={list}
        />
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
    },
});

const loadData = async (request: Request, url: string, setList: any, setNext: any, setRefreshing: any) => {
    setRefreshing(true);

    const res = await request(url);

    if (res?.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(js.results);
    }

    setRefreshing(false);
}

const loadNext = async (request: Request, next: string | null, setList: any, setNext: any, setProcessing: any) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);

    if (res && res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList((e: any) => ([...e, ...js.results]));
    }

    setProcessing(false);
}

export default PaginationList;